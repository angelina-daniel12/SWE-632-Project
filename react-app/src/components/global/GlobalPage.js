import React from "react";
import { useParams } from "react-router-dom";
import "./GlobalPage.css";

const imgs = [
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1522120692538-4b9c8b3e8f3f?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=60",
];

const mockRanking = {
  title: "Movie Tier",
  subtitle: "Global Ranking",
  tiers: [
    {
      label: "Tier S",
      items: [
        { id: "interstellar", name: "Interstellar", pct: 95, img: imgs[0] },
        { id: "inception", name: "Inception", pct: 93, img: imgs[0] },
      ],
    },
    {
      label: "Tier A",
      items: [
        { id: "shutter-island", name: "Shutter Island", pct: 81, img: imgs[2] },
      ],
    },
    {
      label: "Tier B",
      items: [
        { id: "dark-knight", name: "The Dark Knight", pct: 78, img: imgs[2] },
        { id: "arrival", name: "Arrival", pct: 76, img: imgs[0] },
        { id: "whiplash", name: "Whiplash", pct: 74, img: imgs[0] },
      ],
    },
    {
      label: "Tier C",
      items: [
        { id: "parasite", name: "Parasite", pct: 71, img: imgs[2] },
      ],
    },
    {
      label: "Tier D",
      items: [
        { id: "joker", name: "Joker", pct: 64, img: imgs[2] },
        { id: "blade-runner", name: "Blade Runner", pct: 62, img: imgs[0] },
        { id: "gravity", name: "Gravity", pct: 60, img: imgs[0] },
      ],
    },
    {
      label: "Tier E",
      items: [
        { id: "tenet", name: "Tenet", pct: 57, img: imgs[0] },
      ],
    },
    {
      label: "Tier F",
      items: [
        { id: "cats", name: "Cats", pct: 21, img: imgs[2] },
        { id: "emoji", name: "The Emoji Movie", pct: 18, img: imgs[0] },
      ],
    },
  ],
};

function TierSection({ label, items }) {
  return (
    <section className="tierRow">
      <div className="tierLabel">{label.replace("Tier ", "")}</div>

      <div className="tierContent">
        <div className="tierGridCompact">
          {items.map((item) => (
            <article key={item.id} className="itemCardCompact">
              <img className="thumb" src={item.img} alt={item.name} />
              <div className="text">
                <div className="name">{item.name}</div>
                <div className="meta">{item.pct}%</div>
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

  return (
    <div className="globalPage">
      <div className="container">
        <div className="top">
          <div>
            <h1 className="title">{mockRanking.title}</h1>
            <div className="subtitle">{mockRanking.subtitle}</div>
          </div>
        </div>

        <div className="tiers">
          {mockRanking.tiers.map((tier) => (
            <TierSection key={tier.label} label={tier.label} items={tier.items} />
          ))}
        </div>

        {templateId ? <div className="footnote">templateId: {templateId}</div> : null}
      </div>
    </div>
  );
}
