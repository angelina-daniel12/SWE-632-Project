-- INSERT INTO rank_it.templates (name) VALUES ('Dog Breeds'), ('Tropical Fruits');


SELECT
	t.name AS template_name,
    t.id AS template_id,
	i.name,
	i.id
FROM meta_tier.items i
JOIN meta_tier.templates t ON i.template_id = t.id
WHERE t.id = 1
ORDER BY t.name, i.id;

SELECT * FROM meta_tier.templates;
