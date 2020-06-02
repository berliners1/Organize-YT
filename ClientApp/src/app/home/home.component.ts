import { HttpClient } from '@angular/common/http';
import { VideosFromChannel } from '../models/VideosFromChannel';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'app2';
  videoTitle;
  channelTitle;

  ROOT_URL: string = 'https://localhost:44399/api/youtube/';
  CHANNEL_ID: string;
  YOUTUBER_NAME: string;
  VIDEO_ID: string;
  FULL_SEARCH_URL: string;

  constructor(private http: HttpClient) {}

  getPosts(){

    //URL_SEARCH and URL_PAGE are set by an [(ngModel)] two-way binding in movies.component.html
    this.FULL_SEARCH_URL = this.ROOT_URL + "bychannelid/UC-lHJZR3Gqxm24_Vd_AJ5Yw";
    console.log('get posts happened');
    //Get data from the api into this.movies
    this.http.get<VideosFromChannel>(this.FULL_SEARCH_URL).subscribe(data => {
      this.channelTitle = data.items[0].snippet.channelTitle;
      this.videoTitle = data.items[0].snippet.title;
    });
  }
}