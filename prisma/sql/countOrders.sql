WITH client_orders AS (
  SELECT sender_id AS client_id, status FROM "Order"
  UNION ALL
  SELECT receiver_id AS client_id, status FROM "Order"
),
courier_orders AS (
  SELECT courier_id, status FROM "Order"
)
SELECT 
    'client' AS entity_type,
    client_id AS entity_id,
    SUM(1) FILTER (WHERE status IN ('ordered', 'processing')) AS active_count,
    SUM(1) FILTER (WHERE status = 'completed') AS completed_count
FROM client_orders
GROUP BY client_id

UNION ALL

SELECT
    'courier' AS entity_type,
    courier_id AS entity_id,
    SUM(1) FILTER (WHERE status = 'processing') AS active_count,
    SUM(1) FILTER (WHERE status = 'completed') AS completed_count
FROM courier_orders
GROUP BY courier_id;

