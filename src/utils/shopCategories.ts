export interface ShopCategory {
  name: string;
  icon: string;
  bg: string;
  filter: string;
}

export const shopCategories: ShopCategory[] = [
  { name: "Bone, Joint & Muscle Care", filter: "Bone, Joint & Muscle Care", icon: "/images/Category Icons/Bone, joint & muscle care 2.svg", bg: "#f3e4fd" },
  { name: "Cold & Cough", filter: "Cold & Cough", icon: "/images/Category Icons/Cold and Cough remedy.svg", bg: "#fff1e0" },
  { name: "Gut Health", filter: "Gut Health", icon: "/images/Category Icons/Gut Health.svg", bg: "#e2fbff" },
  { name: "Vitamins & Nutrition", filter: "Vitamins & Nutrition", icon: "/images/Category Icons/Vit & Nutrition 1.svg", bg: "#eaecff" },
  { name: "Sexual Health", filter: "Sexual Health", icon: "/images/Category Icons/Sexual health.svg", bg: "#fce4ec" },
  { name: "Hormonal Balance", filter: "Hormonal Balance", icon: "/images/Category Icons/Hormonal balance ref 1.svg", bg: "#e8f5e9" },
  { name: "Fertility", filter: "Fertility", icon: "/images/Category Icons/fertility.svg", bg: "#fff3e0" },
  { name: "Iron Supplement", filter: "Iron Supplement", icon: "/images/Category Icons/Iron supplement.svg", bg: "#ffebee" },
  { name: "Menstruation", filter: "Menstruation", icon: "/images/Category Icons/menstruation.svg", bg: "#fce4ec" },
  { name: "Urinary Health", filter: "Urinary Health", icon: "/images/Category Icons/Urology care.svg", bg: "#e0f7fa" },
  { name: "Female Vitality", filter: "Female Vitality", icon: "/images/Category Icons/Female Vitality symbol.svg", bg: "#fce4ec" },
  { name: "Male Vitality", filter: "Male Vitality", icon: "/images/Category Icons/Male Vitality symbol.png", bg: "#e3f2fd" },
  { name: "Mental Wellness", filter: "Mental Wellness", icon: "/images/Category Icons/Mental Wellness 1.svg", bg: "#e8eaf6" },
  { name: "General Wellness", filter: "General Wellness", icon: "/images/Category Icons/General Wellness Symbol.svg", bg: "#e0f2f1" },
  { name: "Natal Care", filter: "Natal Care", icon: "/images/Category Icons/Natal Care.svg", bg: "#fff9c4" },
  { name: "PCOS / PCOD", filter: "PCOS/PCOD", icon: "/images/Category Icons/PCOS_PCOD.svg", bg: "#f3e5f5" },
  { name: "Nutrition Plus", filter: "Nutrition Plus", icon: "/images/Category Icons/Vit & Nutrition 2.svg", bg: "#e8eaf6" },
  { name: "Immunity Boost", filter: "Immunity Boost", icon: "/images/Category Icons/Vit & Nutrition 3.svg", bg: "#e0f7fa" },
  { name: "Mind & Focus", filter: "Mind & Focus", icon: "/images/Category Icons/Mental Wellness 2.svg", bg: "#ede7f6" },
  { name: "Hormonal Care", filter: "Hormonal Care", icon: "/images/Category Icons/Hormonal balance ref 2.svg", bg: "#e8f5e9" },
];

export function normalizeCategory(value: string): string {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
}
