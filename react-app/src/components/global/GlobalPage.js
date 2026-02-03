import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useApi } from "contexts/ApiContext";
import "./GlobalPage.css";
import { GLOBAL_TEMPLATES } from "./GlobalLandingPage";

const TEMPLATE_IMAGES = {
  1: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=400&q=60", // dog
  2: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=60", // fruit
  3: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=60", // tv
};

const TIER_ORDER = ["S", "A", "B", "C", "D", "E", "F"];

const SLUG_TO_API_ID = GLOBAL_TEMPLATES.reduce((acc, t) => {
  acc[String(t.slug).toLowerCase()] = t.apiId;
  return acc;
}, {});

/** Convert backend response -> UI model */
function toUiRanking(apiData, slug, label) {
  const templateImg = TEMPLATE_IMAGES[apiData.template_id] || TEMPLATE_IMAGES[1];
  const buckets = new Map(TIER_ORDER.map((t) => [t, []]));

  for (const item of apiData.item_rankings || []) {
    const tier = (item.average_tier || "").toUpperCase();
    if (!buckets.has(tier)) continue;

    buckets.get(tier).push({
      id: String(item.item_id),
      name: item.item_name,
      img: templateImg,
      average_tier: tier,
    });
  }

  return {
    title: label ? `${label} Tier` : `${slug} Tier`,
    subtitle: "Global Ranking",
    tiers: TIER_ORDER.map((t) => ({
      label: `Tier ${t}`,
      items: buckets.get(t),
    })),
  };
}

function TierSection({ label, items }) {
  const letter = label.replace("Tier ", "");

  return (
    <section className="tierRow">
      <div className="tierLabel">{letter}</div>

      <div className="tierContent">
        <div className="tierGridCompact">
          {items.map((item) => (
            <article key={item.id} className="itemCardCompact">
              <img className="thumb" src={item.img} alt={item.name} />
              <div className="text">
                <div className="name">{item.name}</div>
                <div className="meta">Global Rank: {item.average_tier}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GlobalPage() {
  const { templateId } = useParams();
  const { SERVER_URL } = useApi();

  const [ranking, setRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const templateMeta = useMemo(() => {
    const slug = (templateId || "").toLowerCase();
    return GLOBAL_TEMPLATES.find((t) => t.slug.toLowerCase() === slug) || null;
  }, [templateId]);

  const apiTemplateId = useMemo(() => {
    const slug = (templateId || "").toLowerCase();
    return SLUG_TO_API_ID[slug];
  }, [templateId]);

  // If API returns empty, show empty state page
  const isEmpty = useMemo(() => {
    if (!ranking) return false;
    return ranking.tiers.every((t) => (t.items || []).length === 0);
  }, [ranking]);

  useEffect(() => {
    if (!templateId) return;

    if (!apiTemplateId) {
      setError(`Unknown template "${templateId}"`);
      setRanking(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`${SERVER_URL}/global/${apiTemplateId}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      })
      .then((response) => {
        const data = response.data;
        const ui = toUiRanking(data, templateId, templateMeta?.label);
        setRanking(ui);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load global rankings");
        setRanking(null);
        setLoading(false);
      });
  }, [SERVER_URL, templateId, apiTemplateId, templateMeta]);

  if (loading) return <div className="subtitle">Loading global ranking…</div>;
  if (error) return <div className="subtitle">Error: {error}</div>;
  if (!ranking) return null;

  // Empty state instead of showing blank tiers (for now)
  if (isEmpty) {
    return (
      <div className="globalPage">
        <div className="container">
          <div className="emptyState">
            <div className="emptyIconWrap">
              <div className="emptyIcon">?</div>
            </div>
            <div className="emptyText">Hmmm... there no items in this template.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="globalPage">
      <div className="container">
        <div className="top">
          <div>
            <h1 className="title">{ranking.title}</h1>
            <div className="subtitle">{ranking.subtitle}</div>
          </div>
        </div>

        <div className="tiers">
          {ranking.tiers.map((tier) => (
            <TierSection key={tier.label} label={tier.label} items={tier.items} />
          ))}
        </div>
      </div>
    </div>
  );
}
