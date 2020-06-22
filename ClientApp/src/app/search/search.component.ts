import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public afs: AngularFirestore, private http: HttpClient){}

  @Input() user: any;
  public getPostsStatusSubs: boolean;
  @Output() blockChannelsRefreshing = new EventEmitter<boolean>();
  channelId: string = '';
  httpCalls: any;
  allUserChannelsData: any;

  //Validate this.channelId to make sure string is 24 characters, and starts with eiether UU or UC

  //If this.channelId starts with UC, replace UC with UU here

  //Check if this.channelID's UU-id matches a real youtube channel, 
  //with a quick /bychannelid search from my api.
  //I probably just need to implement a try catch to be able to tell.

  //function to add strings to addedChannelIds array
  //https://firebase.google.com/docs/firestore/manage-data/add-data#web_12
  addChannelsToArray(user){
    this.blockRefresh();
    this.afs.doc(`users/${user.uid}`).update({
      addedChannelIds: firebase.firestore.FieldValue.arrayUnion(this.channelId)
    });
  }

  blockRefresh(){
    this.blockChannelsRefreshing.emit(false);
  }


  getYourSubscribers(){
    this.getPostsStatusSubs = true;
    let URL = "https://localhost:44399/api/youtube/yoursubscribers"
    this.httpCalls = this.http.get(URL);
    this.httpCalls.subscribe(data => {
      console.log(data);
      this.allUserChannelsData = data;
      this.getPostsStatusSubs = false;
    });
  }

  getSubscriptionChannelId(i){
    console.log('clicked');
    console.log(i);
    let theId = document.querySelector('.subscription-' + i).id;
    console.log(theId);
  }

  ngDoCheck(){
    if(this.getPostsStatusSubs){
      document.querySelector('.loading-indicator-subslist').classList.add('active');
    } else {
      document.querySelector('.loading-indicator-subslist').classList.remove('active');
    }
  }

}
