import { GenreForEditDto } from "./genre-for-edit.dto";
import { ReleasePlaceForEditDto } from "./release-place-for-edit.dto";
import { UniverseForEditDto } from "./universe-for-edit.dto";

export interface TvShowDetailsDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: string;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  tvShowUniverses: Array<UniverseForEditDto>;
  tvShowGenres: Array<GenreForEditDto>;
  releasePlaces: Array<ReleasePlaceForEditDto>;
}
