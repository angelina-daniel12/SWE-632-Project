import React from "react";
import { Link } from "react-router-dom";
import "./LandingGrid.css";

/**
 * items: Array of
 *  {
 *    key: string|number,
 *    title: string,
 *    description?: string,
 *    to: string
 *  }
 */
export default function LandingGrid({ title, subtitle, items }) {
  return (
    <div className="landing">
      <div className="landingContainer">
        <h1 className="landingTitle">{title}</h1>
        {subtitle ? <p className="landingSubtitle">{subtitle}</p> : null}

        <div className="landingGrid">
          {items.map((item) => (
            <Link key={item.key} to={item.to} className="landingCard">
              <div className="landingCardTitle">{item.title}</div>
              {item.description ? (
                <div className="landingCardDesc">{item.description}</div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
