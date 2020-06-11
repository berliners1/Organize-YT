import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  channelVideosDetails: any[] = new Array();
  combinedChannelsArray: any[] = new Array();

  ROOT_URL: string = 'https://localhost:44399/api/youtube/';
  CHANNEL_ID: string;
  YOUTUBER_NAME: string;
  VIDEO_ID: string;
  FULL_SEARCH_URL: string;

  constructor(public auth: AuthService, private http: HttpClient){}

}


