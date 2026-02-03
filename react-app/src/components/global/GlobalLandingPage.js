// ================================
// src/components/global/GlobalLandingPage.js
// ================================
import React from "react";
import { Link } from "react-router-dom";
import "./GlobalLandingPage.css";

export const GLOBAL_TEMPLATES = [
{
    slug: "cutestdogbreeds",
    apiId: 1,
    label: "Cutest Dog Breeds",
    description: "See what global concessus is on dog breeds",
  },
  {
    slug: "fruit",
    apiId: 2,
    label: "Fruit",
    description: "See everyone's favorite fruit",
  },
  {
    slug: "tvshows",
    apiId: 3,
    label: "TV Shows",
    description: "Global consensus for TV series",
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
              key={t.slug}
              to={`/global/${t.slug}`}
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
