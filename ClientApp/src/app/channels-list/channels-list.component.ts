import { Component, Input, AfterContentInit, AfterContentChecked, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideosFromChannel } from '../models/VideosFromChannel';

@Component({
  selector: 'app-channels-list',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.css']
})
export class ChannelsListComponent {

  channelVideosDetails: any[] = new Array();
  combinedChannelsArray: any[] = new Array();
  ROOT_URL: string = 'https://localhost:44399/api/youtube/';
  FULL_SEARCH_URL: string;

  constructor(private http: HttpClient){}

  @Input() userData: any;

  ngOnChanges(changes: SimpleChanges){
    if(this.userData){
      this.getPosts(this.userData);
    }
  }

  canGo: boolean = true;

  getPosts = async(addedChannelIds) => {

    if(this.canGo){
      this.canGo = false;

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

      setTimeout(function(){
        this.canGo = true;
      }, 1000)

    } else {
      console.log("too soon to call api again");
    }


  }

}
