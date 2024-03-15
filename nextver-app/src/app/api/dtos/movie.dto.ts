export interface MovieDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: number;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  formattedMovieCoverUrl?: string;
}
