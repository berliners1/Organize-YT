import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-delete-channel',
  templateUrl: './delete-channel.component.html',
  styleUrls: ['./delete-channel.component.css']
})
export class DeleteChannelComponent {

  constructor(public afs: AngularFirestore) { }

  @Input() user: any;
  @Input() channel: any;
  @Output() blockChannelsRefreshing = new EventEmitter<boolean>();

  deleteChannel(channel, user){
    this.blockRefresh();

    //replace UC with UU at the start of channel ID
    let channelIdToRemove = channel[0].ChannelId.replace(/^.{2}/g, "UU");
    console.log(channelIdToRemove);
    
    //remove specified UU-id from the addedChannelIds array
    this.afs.doc(`users/${user.uid}`).update({
      addedChannelIds: firebase.firestore.FieldValue.arrayRemove(channelIdToRemove)
    });

    //display:none the affected channel on the front-end
    let ucid = (channel[0].ChannelId);
    document.getElementById(ucid).classList.add('hidden');
  }

  blockRefresh(){
    this.blockChannelsRefreshing.emit(true);
  }

}
