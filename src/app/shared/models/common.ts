export interface IResponse {
  current_page: number;
  first_page?: boolean;
  last_page?: boolean;
  limit_value: number;
  next_page: number;
  out_of_range?: boolean;
  prev_page: number;
  total_pages: number;
}

export interface IFilter {
  searchStr: string;
  sort: 'asc' | 'desc';
  popular: boolean;
}

export interface ISocial {
  facebook_handle: string;
  instagram_handle: string;
  twitter_handle: string;
}
