export interface ProductionDetailsDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: string;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  movieUniverses: MovieUniverse[];
  movieGenres: MovieGenre[];
  productionVersions: ProductionVersion[];
}
