export interface EpisodeForEditDto {
  id: number;
  tvShowId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  releaseDate: Date;
}
