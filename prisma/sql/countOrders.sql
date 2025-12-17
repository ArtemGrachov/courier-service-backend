WITH client_orders AS (
  SELECT senderId AS clientId, status FROM "Order"
  UNION ALL
  SELECT receiverId AS clientId, status FROM "Order"
),
courier_orders AS (
  SELECT courierId, status FROM "Order"
)
SELECT 
    'client' AS entityType,
    clientId AS entityId,
    SUM(1) FILTER (WHERE status IN ('ordered', 'processing')) AS activeCount,
    SUM(1) FILTER (WHERE status = 'completed') AS completedCount
FROM client_orders
GROUP BY clientId

UNION ALL

SELECT
    'courier' AS entityType,
    courierId AS entityId,
    SUM(1) FILTER (WHERE status = 'processing') AS activeCount,
    SUM(1) FILTER (WHERE status = 'completed') AS completedCount
FROM courier_orders
GROUP BY courierId;

