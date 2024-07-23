import { GenreForEditDto } from "./genre-for-edit.dto";
import { MovieQualityVersionDetailsDto } from "./movie-quality-version-details.dto";
import { ReleasePlaceForEditDto } from "./release-place-for-edit.dto";
import { UniverseForEditDto } from "./universe-for-edit.dto";

export interface MovieDetailsDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: string;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  viewCounter: number;
  averageRating: number;
  ratingCount: number;
  movieUniverses: Array<UniverseForEditDto>;
  movieGenres: Array<GenreForEditDto>;
  releasePlaces: Array<ReleasePlaceForEditDto>;
  movieVersions: Array<MovieQualityVersionDetailsDto>;
}
