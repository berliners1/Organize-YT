import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public afs: AngularFirestore){}

  ngOnInit() {
  }

  @Input() user: any;
  channelId: string = '';

  //Validate this.channelId to make sure string is 24 characters, and starts with eiether UU or UC

  //If this.channelId starts with UC, replace UC with UU here

  //Check if this.channelID's UU-id matches a real youtube channel, 
  //with a quick /bychannelid search from my api.
  //I probably just need to implement a try catch to be able to tell.

  //function to add strings to addedChannelIds array
  //https://firebase.google.com/docs/firestore/manage-data/add-data#web_12
  addChannelsToArray(user){
    this.afs.doc(`users/${user.uid}`).update({
      addedChannelIds: firebase.firestore.FieldValue.arrayUnion(this.channelId)
    });

  }

}
