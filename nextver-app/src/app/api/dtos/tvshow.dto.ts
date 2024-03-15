export interface TvShowDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: number;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  formattedTvShowCoverUrl?: string;
}
