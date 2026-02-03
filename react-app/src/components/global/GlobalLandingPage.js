import React, { useMemo } from "react";
import LandingGrid from "../sharedComponents/LandingGrid";

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
    slug: "rockbands",
    apiId: 3,
    label: "Rock Bands",
    description: "Global consensus for Rock Bands",
  },
];

export default function GlobalLandingPage() {
  const items = useMemo(
    () =>
      GLOBAL_TEMPLATES.map((t) => ({
        key: t.slug,
        title: t.label,
        description: t.description,
        to: `/global/${t.slug}`,
      })),
    []
  );

  return (
    <LandingGrid
      title="Global Rankings"
      subtitle="Choose a category to view global consensus rankings."
      items={items}
    />
  );
}
