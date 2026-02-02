import React from "react";
import { Link } from "react-router-dom";
import "./GlobalLandingPage.css";

const GLOBAL_TEMPLATES = [
  {
    id: "movies",
    label: "Movies",
    description: "See how movies rank globally across all users",
  },
  {
    id: "tv",
    label: "TV Shows",
    description: "Global consensus for TV series",
  },
  {
    id: "albums",
    label: "Music Albums",
    description: "Community-ranked albums",
  },
];

export default function GlobalLandingPage() {
  return (
    <div className="globalLanding">
      <div className="globalLandingContainer">
        <h1 className="globalLandingTitle">Global Rankings</h1>
        <p className="globalLandingSubtitle">
          Choose a category to view global consensus rankings.
        </p>

        <div className="globalLandingGrid">
          {GLOBAL_TEMPLATES.map((t) => (
            <Link
              key={t.id}
              to={`/global/${t.id}`}
              className="globalLandingCard"
            >
              <div className="globalLandingCardTitle">{t.label}</div>
              <div className="globalLandingCardDesc">{t.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
