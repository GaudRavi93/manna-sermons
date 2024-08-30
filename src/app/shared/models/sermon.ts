export interface ISermonResponse {
  sermons: {
    current_page: number;
    first_page?: boolean;
    last_page?: boolean;
    limit_value: number;
    next_page: number;
    out_of_range?: boolean;
    prev_page: number;
    total_pages: number;

    results: ISermon[];
  }
}

export interface ISemonsTrandingKewwords {
  keywords: {
    results: ISermonKeyword[]
  }
}

export interface ISermonKeyword {
  name: string;
  sermon_count: number
}

export interface ISermon {
  description: string
  id: number;
  keyword_list: string[];
  liked: boolean;
  likes_count: number;
  notes: string;
  pastor_id: number;
  text_reference_list: string[];
  title: string;
  video: IVideo;
}

export interface IVideo {
  author: string;
  available: boolean;
  date: string;
  description: string;
  duration: number;
  embed_code: string;
  embed_url: string;
  id: number;
  provider: string;
  sermon_only: boolean;
  sermon_start_time: number;
  thumbnail_url: string;
  title: string;
  video_key: string;

  created_at: string;
  updated_at: string;
  video_views_count: number;
  pastor_photo_url: string;
}
