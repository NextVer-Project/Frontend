export interface MovieDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: string;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  formattedMovieCoverUrl?: string;
  viewCounter: number;
}
