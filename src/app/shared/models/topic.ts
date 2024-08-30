import { ISermon } from './sermon';

export interface ITopic {
  image_url: string;
  name: string;
  sermon_count: number;
}

export interface ITopicsResponse {
  topics: {
    current_page: number;
    first_page?: boolean;
    last_page?: boolean;
    limit_value: number;
    next_page: number;
    out_of_range?: boolean;
    prev_page: number;
    results: ITopic[];
    total_pages: number;
  };
}

export interface ISermonTopicsResponse {
  sermons: {
    current_page: number;
    first_page?: boolean;
    last_page?: boolean;
    limit_value: number;
    next_page: number;
    out_of_range?: boolean;
    prev_page: number;
    results: ISermon[];
    total_pages: number;
  };
}
