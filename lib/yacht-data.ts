export type YachtSpec = {
  label: string;
  value: string;
  unit?: string;
};

export type YachtFeature = {
  key: string;
  labelEn: string;
  labelDe: string;
  icon: string; // lucide icon name
};

export const yachtSpecs: YachtSpec[] = [
  { label: "Model", value: "X5000", unit: "50ft Catamaran" },
  { label: "Length", value: "15.20", unit: "m" },
  { label: "Beam", value: "7.90", unit: "m" },
  { label: "Draft", value: "1.30", unit: "m" },
  { label: "Weight", value: "14,500", unit: "kg" },
  { label: "Main Sail", value: "97", unit: "m²" },
  { label: "Reacher", value: "120", unit: "m²" },
  { label: "Self-tacking Jib", value: "55", unit: "m²" },
  { label: "Fuel Capacity", value: "400", unit: "L" },
  { label: "Cruising Speed", value: "8–12", unit: "kn" },
];

export const yachtSpecsDe: YachtSpec[] = [
  { label: "Modell", value: "X5000", unit: "50ft Katamaran" },
  { label: "Länge", value: "15,20", unit: "m" },
  { label: "Breite", value: "7,90", unit: "m" },
  { label: "Tiefgang", value: "1,30", unit: "m" },
  { label: "Gewicht", value: "14.500", unit: "kg" },
  { label: "Großsegel", value: "97", unit: "m²" },
  { label: "Reacher", value: "120", unit: "m²" },
  { label: "Selbstwendefock", value: "55", unit: "m²" },
  { label: "Kraftstoffkapazität", value: "400", unit: "L" },
  { label: "Reisegeschwindigkeit", value: "8–12", unit: "kn" },
];

export const yachtFeatures: YachtFeature[] = [
  { key: "cabins",    labelEn: "3 Double Cabins",        labelDe: "3 Doppelkabinen",        icon: "BedDouble" },
  { key: "guests",    labelEn: "Up to 6 Guests",         labelDe: "Bis zu 6 Gäste",         icon: "Users" },
  { key: "bathrooms", labelEn: "3 Private Bathrooms",    labelDe: "3 Private Bäder",        icon: "ShowerHead" },
  { key: "wifi",      labelEn: "Wi-Fi",                  labelDe: "WLAN",                   icon: "Wifi" },
  { key: "ac",        labelEn: "Air Conditioning",       labelDe: "Klimaanlage",            icon: "Wind" },
  { key: "solar",     labelEn: "Solar Panels",           labelDe: "Solaranlage",            icon: "Sun" },
  { key: "bluetooth", labelEn: "Bluetooth Stereo",       labelDe: "Bluetooth-Stereo",       icon: "Music" },
  { key: "tv",        labelEn: "TV & Entertainment",     labelDe: "TV & Unterhaltung",      icon: "Tv" },
  { key: "galley",    labelEn: "Equipped Galley",        labelDe: "Ausgestattete Kombüse",  icon: "ChefHat" },
  { key: "shower",    labelEn: "Outdoor Shower",         labelDe: "Außendusche",            icon: "Droplets" },
  { key: "diving",    labelEn: "Diving Equipment",       labelDe: "Tauchausrüstung",        icon: "Anchor" },
  { key: "watersport",labelEn: "Watersports Gear",       labelDe: "Wassersportausrüstung",  icon: "Waves" },
];
