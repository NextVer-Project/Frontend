import { TechnologyForEditDto } from "./technology-for-edit.dto";
import { ReleasePlaceForEditDto } from "./release-place-for-edit.dto";
import { ProductionTypeForEditDto } from "./production-type-for-edit.dto";

export interface MovieQualityVersionDetailsDto {
  id: number;
  idMovieTVSerieGame: number;
  productionTypeId: number;
  releasePlaceId: number;
  releaseDate: string;
  linkToProductionVersion: string;
  productionType: ProductionTypeForEditDto;
  releasePlace: ReleasePlaceForEditDto;
  technologies: Array<TechnologyForEditDto>;
}
