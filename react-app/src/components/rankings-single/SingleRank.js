import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./SingleRank.css";

// Template-specific placeholder images (keyed by numeric template_id)
const TEMPLATE_IMAGES = {
  1: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=60", // dog
  2: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=60", // fruit
  3: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=60", // tv
};

const DEFAULT_IMG = TEMPLATE_IMAGES[1];

// Fallback mock (API fails)
const mockRanking = {
  title: "My Ranking",
  subtitle: "My Ranking",
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
function toUiRanking(apiData, template_name) {
  const templateImg = TEMPLATE_IMAGES[apiData?.template_id] || DEFAULT_IMG;

  const buckets = new Map(TIER_ORDER.map((t) => [t, []]));

  for (const item of apiData.item_rankings || []) {
    const tier = (item.tier || "").toUpperCase();
    if (!buckets.has(tier)) continue;

    buckets.get(tier).push({
      id: String(item.item_id),
      name: item.item_name,
      img: templateImg,
      tier: tier,
    });
  }

  return {
    title: template_name,
    subtitle: "My Ranking",
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RankingPage() {
  // Route: /global/:rankingId (rankingId is a slug like "fruit" or "tv shows")
  const { rankingId } = useParams();
  const location = useLocation();
  const { template_name } = location.state;

  const [ranking, setRanking] = useState(mockRanking);

  const baseUrl = useMemo(
    () => "https://interadditive-benny-matrilineal.ngrok-free.dev",
    []
  );

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://metatier.turkmenkaan.xyz:8000/tier-list/${rankingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            // Always check if the response is okay (status 200-299)
            if (!response.ok) {
                console.log(`HTTP error ${response.status}`)
            }

            const data = await response.json();
            setRanking(toUiRanking(data, template_name))
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    };

    fetchData();

    return () => {
      // Optional cleanup code
    };
  }, []);
        


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
            <TierSection
              key={tier.label}
              label={tier.label}
              items={tier.items}
            />
          ))}
        </div>

        {rankingId ? (
          <div className="idChip">
            Rank Id: <span className="idChipValue">{rankingId}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
