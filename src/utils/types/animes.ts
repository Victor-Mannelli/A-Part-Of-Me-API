export type AnimeData = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  status: string;
  type: string;
  format: string;
  description: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  season: string;
  episodes: number;
  duration: number;
  chapters: number;
  volumes: number;
  source: string;
  trailer: {
    id: number;
    site: string;
    thumbnail: string;
  };
  updatedAt: number;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
  };
  bannerImage: string;
  genres: string[];
  synonyms: string[] | string;
  meanScore: number;
  averageScore: number;
  popularity: number;
  favourites: number;
  tags: {
    id: number;
    name: string;
    description: string;
    category: string;
    isAdult: boolean;
  }[];
  characters: {
    nodes: {
      id: number;
      name: {
        full: string;
      };
      image: {
        large: string;
        medium: string;
      };
      gender: string;
      description: string;
      dateOfBirth: {
        year: number;
        month: number;
        day: number;
      };
      age: number;
      bloodType: string;
      favourites: number;
    };
  };
  isAdult: boolean;
  nextAiringEpisode: {
    id: number;
    timeUntilAiring: number;
    episode: number;
  };
};

export type UserAnimeStatus = {
  userId: number;
  animeId: number;
  status: string;
  score: number;
  progress: number;
  rewatches: number;
  startDate: number;
  finishDate?: number;
  favorite: boolean;
};
