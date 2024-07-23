export interface ProductionVersionForEditDto {
  id: number;
  idMovieTVSerieGame: number;
  productionTypeId: number;
  releasePlaceId: number;
  linkToProductionVersion: string;
  releasedDate: Date;
  isAvailable: boolean;
}
