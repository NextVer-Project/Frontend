export interface TvShowForAddDto {
  title: string;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  genreIds: Array<number>;
  universeIds: Array<number>;
}
