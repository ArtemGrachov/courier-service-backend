WITH client_orders AS (
  SELECT senderId AS clientId, status FROM 'Order'
  UNION ALL
  SELECT receiverId AS clientId, status FROM 'Order'
),
courier_orders AS (
  SELECT courierId, status FROM 'Order'
)
SELECT 
    'client' AS entityType,
    clientId AS entityId,
    SUM(CASE WHEN status IN ('ordered', 'processing') THEN 1 ELSE 0 END) AS activeCount,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completedCount
FROM client_orders
GROUP BY clientId

UNION ALL

SELECT
    'courier' AS entityType,
    courierId AS entityId,
    SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) AS activeCount,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completedCount
FROM courier_orders
GROUP BY courierId;

