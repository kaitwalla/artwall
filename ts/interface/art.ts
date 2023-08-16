export interface Art {
  id: number;
  title: string;
  description: string;
  artist: string;
  favorited: boolean;
  url: string;
  source: string;
  sourceId: string | number;
}

export enum ArtType {
  Random,
  Cached,
  Favorited,
  Videos,
}
