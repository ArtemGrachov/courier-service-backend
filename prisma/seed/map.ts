export function randomPointAround(
  center: { lat: number, lng: number },
  radiusKm: number,
) {
  const radiusInDegrees = radiusKm / 111;

  const u = Math.random();
  const v = Math.random();

  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;

  const deltaLat = w * Math.cos(t);
  const deltaLng = w * Math.sin(t) / Math.cos(center.lat * Math.PI / 180);

  return {
    lat: center.lat + deltaLat,
    lng: center.lng + deltaLng,
  };
}

