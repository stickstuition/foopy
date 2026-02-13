// src/engine/badges.js

const CITY_BADGE_COST = 1000;
const TEAM_BADGE_COST = 500;

function teamBadge(id, name, icon) {
  return {
    id,
    name,
    type: "team",
    icon,
    unlock: { method: "coins", cost: TEAM_BADGE_COST }
  };
}

function challengeBadge(id, name, icon, challengeId) {
  return {
    id,
    name,
    type: "special",
    icon,
    fullArt: true,
    unlock: { method: "challenge", challengeId }
  };
}

function cityBadge(id, name, icon) {
  return {
    id,
    name,
    type: "city",
    icon,
    fullArt: true,
    unlock: { method: "coins", cost: CITY_BADGE_COST }
  };
}


export const BADGES = {
  // Team badges
  adel: teamBadge("adel", "Adelaide Crows", "/logos/AdelaideCrows.webp"),
  bri: teamBadge("bri", "Brisbane Lions", "/logos/BrisbaneLions.webp"),
  car: teamBadge("car", "Carlton", "/logos/Carlton.webp"),
  col: teamBadge("col", "Collingwood", "/logos/Collingwood.webp"),
  ess: teamBadge("ess", "Essendon", "/logos/Essendon.webp"),
  fre: teamBadge("fre", "Fremantle", "/logos/Fremantle.webp"),
  gcs: teamBadge("gcs", "Gold Coast Suns", "/logos/GCSuns.webp"),
  gee: teamBadge("gee", "Geelong Cats", "/logos/Geelong.webp"),
  gws: teamBadge("gws", "GWS Giants", "/logos/GWS.webp"),
  haw: teamBadge("haw", "Hawthorn", "/logos/Hawthorn.webp"),
  mel: teamBadge("mel", "Melbourne", "/logos/Melbourne.webp"),
  nth: teamBadge("nth", "North Melbourne", "/logos/North_Melbourne.webp"),
  port: teamBadge("port", "Port Adelaide", "/logos/PortAdelaide.webp"),
  ric: teamBadge("ric", "Richmond", "/logos/Richmond.webp"),
  stk: teamBadge("stk", "St Kilda", "/logos/StKildaFC.webp"),
  syd: teamBadge("syd", "Sydney Swans", "/logos/SydneySwans.webp"),
  wce: teamBadge("wce", "West Coast Eagles", "/logos/West_Coast.webp"),
  wbd: teamBadge("wbd", "Western Bulldogs", "/logos/Western_Bulldogs.webp"),

founder: challengeBadge("founder", "Founder", "/badges/founder01.png", "founder"),

  // City badges (premium)
  adl: cityBadge("adl", "Adelaide", "/badges/adelaide01.png"),
  bne: cityBadge("bne", "Brisbane", "/badges/brisbane01.png"),
  drw: cityBadge("drw", "Darwin", "/badges/darwin01.png"),
  hba: cityBadge("hba", "Hobart", "/badges/hobart01.png"),
  melb: cityBadge("melb", "Melbourne", "/badges/melbourne01.png"),
  per: cityBadge("per", "Perth", "/badges/perth01.png"),
  sydc: cityBadge("sydc", "Sydney", "/badges/sydney01.png")
};

// Helper lists (useful for UI)
export const BADGE_LIST = Object.values(BADGES);
export const TEAM_BADGE_IDS = BADGE_LIST
  .filter(b => b.type === "team")
  .map(b => b.id);
