export type CategoryId = 'seriously-uncool' | 'uncool' | 'cool' | 'subzero' | 'fridge';

export interface ProfileStat {
  label: string;
  value: string | number;
}

export interface Profile {
  id: string;
  name: string;
  subtitle: string;
  themeId: string;
  category: CategoryId;
  imageUrl: string;
  clarksonVerdict: string;
  coolScore: number; // 0 to 100
  tags: string[];
  stats: ProfileStat[];
  pros: string[];
  cons: string[];
  isOutOfReach?: boolean; // Placed at top shelf Clarkson-style
  createdAt: number;
}

export interface ColumnDefinition {
  id: CategoryId;
  title: string;
  subtitle: string;
  badge: string;
  accent: string;
  headerBg: string;
  borderGlow: string;
  iconName: string;
  description: string;
}

export interface WallTheme {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  badge: string;
  description: string;
  bgClass: string;
  boardTexture: string;
  accentColor: string;
  soundPreset: 'cars' | 'billionaire' | 'spacex' | 'tech' | 'cyberpunk';
  columns: Record<CategoryId, {
    title: string;
    subtitle: string;
    badge: string;
    desc: string;
  }>;
  presetStats: string[];
  sampleVerdictTemplates: string[];
}
