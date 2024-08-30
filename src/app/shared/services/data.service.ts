import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IChurch, IChurchPastorResponse, IChurchResponse } from '../models/church';
import { IPastor, IPastorResponse } from '../models/pastor';
import { ISemonsTrandingKewwords, ISermon, ISermonResponse } from '../models/sermon';
import { ISermonTopicsResponse, ITopic, ITopicsResponse } from '../models/topic';
import { IFilter } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private id = 0;

  constructor(
    private http: HttpClient
  ) { }

  // Churches
  public getChurches(text = '', page = 1): Observable<IChurchResponse> {
    let query = `?per_page=25&page=${page}&q[s]=name asc`;
    if (text !== '') {
      query += `&q[name_or_city_or_state_cont]=${text}`;
    }
    return this.http.get<IChurchResponse>(environment.API + `/churches/${query}`);
  }

  public getChurchDetail(id: number): Observable<IChurch> {
    return this.http.get<IChurch>(environment.API + '/churches/' + id);
  }

  public getChurchPastors(id: number) :Observable<IChurchPastorResponse> {
    return this.http.get<IChurchPastorResponse>(environment.API + '/pastors?q[church_id_eq]=' + id);
  }

  // Sermons
  public getSermonDetail(id: number): Observable<ISermon> {
    return this.http.get<ISermon>(environment.API + '/sermons/' + id);
  }

  public likeSermon(id: number): Observable<ISermon> {
    return this.http.put<ISermon>(environment.API + `/sermons/${id}/like`, {});
  }

  public unLikeSermon(id: number): Observable<ISermon> {
    return this.http.delete<ISermon>(environment.API + `/sermons/${id}/like`);
  }

  public viewedSermon(id: number): Observable<ISermon> {
    return this.http.put<ISermon>(environment.API + `/sermons/${id}/view`, {});
  }

  public getFavoriteSermons(text = '', kw = ''): Observable<ISermonResponse> {
    let query = `/sermons/liked?q[s]=video_date desc`;
    if (text !== '') {
      query += `&q[keywords_or_title_or_pastor_full_name_cont]=${text}`;
    }
    if (kw !== '') {
      query += `&q[keywords_cont]=${kw}`;
    }
    return this.http.get<ISermonResponse>(environment.API + query);
  }

  public getTrendingSermonKeywords(): Observable<ISemonsTrandingKewwords> {
    return this.http.get<ISemonsTrandingKewwords>(environment.API + '/sermons/keywords/trending');
  }

  public getSermons(pastorId: number, limit = 12, page = 1, text = '', kw = ''): Observable<ISermonResponse> {
    let query = `?per_page=${limit}&page=${page}&q[s]=video_date desc`;
    if (text !== '') {
      query += `&q[keywords_or_title_or_pastor_full_name_cont]=${text}`;
    }
    if (kw !== '') {
      query += `&q[keywords_cont]=${kw}`;
    }
    if (pastorId) {
      query += `&q[pastor_id_eq]=${pastorId}`;
    }

    return this.http.get<ISermonResponse>(environment.API + `/sermons/${query}`);
  }

  public getRecentVideoByPastorId(id: number): Observable<ISermonResponse> {
    let query = `/sermons/?q[s]=created_at desc&per_page=1`;
    query += `&q[pastor_id_eq]=${id}`;
    return this.http.get<ISermonResponse>(environment.API + query);
  }

  public getRecentVideo(): Observable<ISermonResponse> {
    return this.http.get<ISermonResponse>(environment.API + `/sermons/?q[s]=created_at desc&per_page=1`);
  }

  // Topics
  public getTopics(text = '', page = 1): Observable<ITopicsResponse> {
    let query = `?per_page=25&page=${page}&q[s]=name asc`;
    if (text !== '') {
      query += `&q[name_cont]=${text}`;
    }

    return this.http.get<ITopicsResponse>(environment.API + `/sermons/topics/${query}`);
  }

  public getTopicDetail(name: string, filter: IFilter, page = 1): Observable<ISermonResponse> {
    name = (name as any).replaceAll('&', '%26');
    let query = `?per_page=25&page=${page}&q[topic_eq]=${name}`;
    if (filter.searchStr) {
      query += `&q[keyword_cont]=${filter.searchStr}&q[title_cont]=${filter.searchStr}`;
    }

    if (filter.popular) {
      query += `&q[s]=likes_count desc`;
    } else {
      query += `&q[s]=updated_at ${filter.sort}`;
    }
    return this.http.get<ISermonResponse>(environment.API + `/sermons/${query}`);
  }

  // Pastors
  public getPastors(text = '', page = 1): Observable<IPastorResponse> {
    let query = `?per_page=25&page=${page}&q[s]=family_name asc`;
    if (text !== '') {
      /*['family_name', 'given_name', 'city', 'state'].forEach(n => {
        query += `&q[${n}_cont]=${text}`;
      });*/
      query += `&q[family_name_or_given_name_or_city_or_state_cont]=${text}`;
    }
    return this.http.get<IPastorResponse>(environment.API + `/pastors${query}`);
  }

  public getPastorsDetails(ids: number[]): Promise<IPastor[]> {
    const arr = ids.map(id => this.getPastorDetail(id).toPromise());
    return Promise.all(arr);
  }

  public getPastorDetail(id: number): Observable<IPastor> {
    return this.http.get<IPastor>(environment.API + '/pastors/' + id);
  }

  public getFeaturedPastor(): Observable<IPastor> {
    return this.http.get<IPastor>(environment.API + '/pastors/featured');
  }

  public followPastor(id: number): Observable<IPastor> {
    return this.http.put<IPastor>(environment.API + `/pastors/${id}/follow`, {});
  }

  public unFollowPastor(id: number): Observable<IPastor> {
    return this.http.delete<IPastor>(environment.API + `/pastors/${id}/follow`);
  }

  public getFollowedPastors(): Observable<IPastorResponse> {
    return this.http.get<IPastorResponse>(environment.API + '/pastors/followed');
  }
}
