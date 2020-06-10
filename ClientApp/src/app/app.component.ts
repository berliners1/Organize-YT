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
  channelVideosDetails: any[] = new Array();
  combinedChannelsArray: any[] = new Array();

  ROOT_URL: string = 'https://localhost:44399/api/youtube/';
  CHANNEL_ID: string;
  YOUTUBER_NAME: string;
  VIDEO_ID: string;
  FULL_SEARCH_URL: string;

  constructor(public auth: AuthService, private http: HttpClient){}

  
  getPosts = async(addedChannelIds) => {

    let i = 0;
    for await(let addedChannelId of addedChannelIds){
      this.FULL_SEARCH_URL = this.ROOT_URL + "bychannelid/" + addedChannelId;

      this.http.get<VideosFromChannel>(this.FULL_SEARCH_URL)
      .subscribe(data => {

        //Have all "data's" existing at the same time in the same (final) iteration.
        this.channelVideosDetails[i] = data;

        //Combine all the separate 'channel' arrays into one big array that contains recent videos from all channels.
        this.combinedChannelsArray.push(this.channelVideosDetails[i]);

        i++;
        
      });
      
      
    }
  }

}


