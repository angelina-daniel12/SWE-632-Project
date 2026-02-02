
SELECT
    t.id AS template_id,
	t.name AS template_name,
    r.tier_list_id,
	i.name AS item_name,
    i.id AS item_id,
	r.tier,
    r.position
FROM meta_tier.item_rankings r
JOIN meta_tier.items i ON r.item_id = i.id
JOIN meta_tier.tier_lists l ON r.tier_list_id = l.id
JOIN meta_tier.users u ON l.user_id = u.id
JOIN meta_tier.templates t ON l.template_id = t.id
WHERE t.id = 2
ORDER BY r.tier_list_id, r.tier, r.position ASC;

-- SELECT * from meta_tier.item_rankings
