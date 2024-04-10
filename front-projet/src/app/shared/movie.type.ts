export type Movie = {
    id: string;
    media_type: string;
    poster_path: string;
    title: string;
    name: string; 
    release_date : Date
    first_air_date : Date;
    release_date_frmv: string;
    release_date_frse: string;
    genres: {
      name: string
    }[]
    runtime: string
    overview: string;

    created_by:{
      name:string
    }

    episodes: Episode[];
    isFavoris: boolean;

    vote_average: number
}

export type Episode = {
  id: number;
  name: string;
  episode_number: number;
  season_number: number;
  runtime: number; 
}
  