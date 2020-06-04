import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { VideosFromChannel } from './models/VideosFromChannel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  videoTitle: string[] = new Array();
  channelTitle: string;

  ROOT_URL: string = 'https://localhost:44399/api/youtube/';
  CHANNEL_ID: string;
  YOUTUBER_NAME: string;
  VIDEO_ID: string;
  FULL_SEARCH_URL: string;

  constructor(public auth: AuthService, private http: HttpClient){}

  getPosts(addedChannelIds){

    for(let i = 0; i < addedChannelIds.length; i++){
      this.FULL_SEARCH_URL = this.ROOT_URL + "bychannelid/" + addedChannelIds[i];
      
      this.http.get<VideosFromChannel>(this.FULL_SEARCH_URL)
      .subscribe(data => {
        this.videoTitle[i] = data.items[i].snippet.title;
        console.log("video " + this.videoTitle[i]);
      });
    }

  }
}


