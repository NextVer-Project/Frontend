export interface ProductionDto {
  id: number;
  title: string;
  releaseDate: string;
  runtime: string;
  description: string;
  coverUrl: string;
  formattedProductionCoverUrl?: string;
}
