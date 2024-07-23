export interface MovieForEditDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: number;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  genreIds: Array<number>;
  universeIds: Array<number>;
  movieVersionsIds: Array<number>;
}
