import { IPastor } from './pastor';

export interface IChurchResponse {
  churches: {
    current_page: number;
    first_page?: boolean;
    last_page?: boolean;
    limit_value: number;
    next_page: number;
    out_of_range?: boolean;
    prev_page: number;
    results: IChurch[];
    total_pages: number;
  };
}

export interface IChurchPastorResponse {
  pastors: {
    results: IPastor[];
  }
}

export interface IChurch {
  id: number;
  name: string;
  city: string;
  state: string;
  url?: string;
  website_url?: string;
  char?: string;
  pastors?: IPastor[];

  congregation_size: number;
  description: string;
  facebook_handle: string;
  instagram_handle: string;
  news: string;
  twitter_handle: string;
}

