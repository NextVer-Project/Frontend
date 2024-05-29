export interface ProductionDto {
  id: number;
  title: string;
  releaseDate: Date;
  runtime: string;
  description: string;
  coverUrl: string;
  formattedProductionCoverUrl?: string;
}
