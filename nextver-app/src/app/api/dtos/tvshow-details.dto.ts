export interface TvShowDetailsDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: string;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  tvShowUniverses: TvShowUniverse[];
  tvShowGenres: TvShowGenre[];
  productionVersions: ProductionVersion[];
}
