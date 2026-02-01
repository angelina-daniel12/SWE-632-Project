
SELECT
	u.username,
	i.name,
    r.tier_list_id,
	r.tier,
    r.position
FROM meta_tier.item_rankings r
JOIN meta_tier.items i ON r.item_id = i.id
JOIN meta_tier.tier_lists t ON r.tier_list_id = t.id
JOIN meta_tier.users u ON t.user_id = u.id
-- WHERE r.tier_list_id = 2
ORDER BY r.tier_list_id, r.tier, r.position ASC
