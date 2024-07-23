import { TimeInterval } from "rxjs/internal/operators/timeInterval";

export interface EpisodeForAddDto {
  tvShowId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  releaseDate: Date;
}
