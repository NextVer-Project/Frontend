export interface MovieForAddDto {
  title: string;
  releaseDate: Date;
  runtime: number;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  genreIds: Array<number>;
  universeIds: Array<number>;
}
