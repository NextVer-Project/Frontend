export interface TvShowForEditDto {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  genreIds: Array<number>;
  universeIds: Array<number>;
}
