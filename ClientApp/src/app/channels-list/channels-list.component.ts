import { Component, Input, SimpleChanges, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideosFromChannel } from '../models/VideosFromChannel';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

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
  canGo: boolean = true;
  channelId: string = "";

  constructor(private http: HttpClient, public afs: AngularFirestore){}

  @Input() userAddedChannelIds: any;
  @Input() user: any;

  ngOnChanges(changes: SimpleChanges){

    if(this.userAddedChannelIds){
      console.log('get posts');
      console.log("onChanges- " + this.userAddedChannelIds);
      this.getPosts(this.userAddedChannelIds);
    } else {
      console.log('no posts');
    }
  }
  
  getPosts = async(addedChannelIds) => {
    let i = 0;
    for await(let addedChannelId of addedChannelIds){

      this.FULL_SEARCH_URL = this.ROOT_URL + "bychannelid/" + addedChannelId;

      this.http.get<VideosFromChannel>(this.FULL_SEARCH_URL)
      .subscribe(data => {
        //Have all "data's" existing at the same time in the same (final) iteration.
        this.channelVideosDetails[i] = data;

        console.log("subscribe-");
        console.log(this.channelVideosDetails[i]);

        //Combine all the separate 'channel' arrays into one big array that contains recent videos from all channels.
        this.combinedChannelsArray.push(this.channelVideosDetails[i]);
        
        i++;
      });
    }

    //display:none existing channels and replace with what is now current in firebase's db, to avoid duplicates.
    let channelsToRemove = document.querySelectorAll('.channel-class');
    for(let j = 0; j < channelsToRemove.length; j++){
      channelsToRemove[j].classList.add('hidden');
    }
  }

  deleteChannel(channel, user){
    //replace UC with UU at the start of channel ID
    let channelIdToRemove = channel.items[0].snippet.channelId.replace(/^.{2}/g, "UU");
    
    //remove specified UU-id from the addedChannelIds array
    this.afs.doc(`users/${user.uid}`).update({
      addedChannelIds: firebase.firestore.FieldValue.arrayRemove(channelIdToRemove)
    });
  }

}
