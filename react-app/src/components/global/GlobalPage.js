// src/components/global/GlobalPage.js
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./GlobalPage.css";
import { GLOBAL_TEMPLATES } from "./GlobalLandingPage";

// Template-specific placeholder images (keyed by numeric template_id)
const TEMPLATE_IMAGES = {
  1: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=60", // dog
  2: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=60", // fruit
  3: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=60", // tv
};

const DEFAULT_IMG = TEMPLATE_IMAGES[1];

// Fallback mock (API fails)
const mockRanking = {
  title: "Global Ranking",
  subtitle: "Global Ranking",
  tiers: [
    { label: "Tier S", items: [] },
    { label: "Tier A", items: [] },
    { label: "Tier B", items: [] },
    { label: "Tier C", items: [] },
    { label: "Tier D", items: [] },
    { label: "Tier E", items: [] },
    { label: "Tier F", items: [] },
  ],
};

const TIER_ORDER = ["S", "A", "B", "C", "D", "E", "F"];

// Build slug -> numeric apiId map from the landing page constants
const SLUG_TO_API_ID = GLOBAL_TEMPLATES.reduce((acc, t) => {
  acc[t.slug.toLowerCase()] = t.apiId;
  return acc;
}, {});

function EmptyState({ label }) {
  return (
    <div className="emptyState">
      <div className="emptyIconWrap">
        <div className="emptyIcon">?</div>
      </div>
      <div className="emptyText">
        Hmmm... there are no items in <strong>{label}</strong>.
      </div>
    </div>
  );
}

// Converts backend response -> UI model page expects
function toUiRanking(apiData, slug, label) {
  const templateImg = TEMPLATE_IMAGES[apiData?.template_id] || DEFAULT_IMG;

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
  // Route: /global/:templateId (templateId is a slug like "fruit" or "tv shows")
  const { templateId } = useParams();

  const [ranking, setRanking] = useState(mockRanking);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const baseUrl = useMemo(
    () => "https://interadditive-benny-matrilineal.ngrok-free.dev",
    []
  );

  // Find template metadata from your landing list
  const templateMeta = useMemo(() => {
    const slug = (templateId || "").toLowerCase();
    return GLOBAL_TEMPLATES.find((t) => t.slug.toLowerCase() === slug) || null;
  }, [templateId]);

  useEffect(() => {
    if (!templateId) return;

    const slug = String(templateId).toLowerCase();
    const apiTemplateId = SLUG_TO_API_ID[slug];

    if (!apiTemplateId) {
      setError(`Unknown template "${templateId}"`);
      setRanking(mockRanking);
      setIsEmpty(false);
      return;
    }

    const fetchGlobal = async () => {
      setLoading(true);
      setError("");
      setIsEmpty(false);

      try {
        const response = await fetch(`${baseUrl}/global/${apiTemplateId}`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        const items = data?.item_rankings || [];
        setIsEmpty(items.length === 0);

        const ui = toUiRanking(data, slug, templateMeta?.label);
        setRanking(ui);
      } catch (e) {
        setError(e?.message || "Failed to load global rankings");
        setIsEmpty(false);
        setRanking(toUiRanking({ template_id: null, item_rankings: [] }, slug, templateMeta?.label));
      } finally {
        setLoading(false);
      }
    };

    fetchGlobal();
  }, [templateId, baseUrl, templateMeta]);

  return (
    <div className="globalPage">
      <div className="container">
        <div className="top">
          <div>
            <h1 className="title">{ranking.title}</h1>
            <div className="subtitle">{ranking.subtitle}</div>
          </div>
        </div>

        {loading ? <div className="subtitle">Loading global ranking…</div> : null}
        {error ? <div className="subtitle">Error: {error}</div> : null}

        {!loading && !error && isEmpty ? (
          <EmptyState label={templateMeta?.label || templateId} />
        ) : (
          <div className="tiers">
            {ranking.tiers.map((tier) => (
              <TierSection
                key={tier.label}
                label={tier.label}
                items={tier.items}
              />
            ))}
          </div>
        )}

        {templateId ? (
          <div className="idChip">
            Template: <span className="idChipValue">{templateId}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
