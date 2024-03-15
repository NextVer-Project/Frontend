import { TechnologyForEditDto } from "./technology-for-edit.dto";

export interface MovieVersionDetailsDto {
  releasePlaceName: string;
  productionTypeName: string;
  releaseDate: string;
  linkToProductionVersion: string;
  technologies: Array<TechnologyForEditDto>;
}
