interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const API_BASE_URL = "https://api.themoviedb.org/3";

export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "appication/json",
        authorization: `Bearer ${API_KEY}`
    }
}