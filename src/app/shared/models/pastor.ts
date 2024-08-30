export interface IPastorResponse {
  pastors: {
    current_page: number;
    first_page?: boolean;
    last_page?: boolean;
    limit_value: number;
    next_page: number;
    out_of_range?: boolean;
    prev_page: number;
    results: IPastor[];
    total_pages: number;
  };
}

export interface IPastor {
  id: number;
  name?: string;
  city: string;
  state: string;
  photo: string;
  church_id: number;

  // extra
  churchName?: string;
  sermons?: number;
  char?: string;

  bio: string;
  facebook_handle: string;
  family_name: string;
  followed: boolean;
  follower_info: string;
  follows_count: number;
  given_name: string;
  honorific: string;
  instagram_handle: string;
  phone: string;
  reviewer_info: string;
  suffix: string;
  twitter_handle: string;

  created_at: string;
  photo_url: string;
  updated_at: string;
}
