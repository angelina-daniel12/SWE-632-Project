import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useApi } from "contexts/ApiContext";
import LandingGrid from "../sharedComponents/LandingGrid";

export default function ExplorePage() {
  const { SERVER_URL } = useApi();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/templates`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      })
      .then((response) => {
        setTemplates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [SERVER_URL]);

  const items = useMemo(
    () =>
      templates.map((t) => ({
        key: t.id,
        title: t.name,
        description: "Start making your rank",
        to: `/templates/${t.id}`,
      })),
    [templates]
  );

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div>Error loading templates: {error}</div>;

  return (
    <LandingGrid
      title="Explore Templates"
      subtitle="Pick and fill out your template"
      items={items}
    />
  );
}
