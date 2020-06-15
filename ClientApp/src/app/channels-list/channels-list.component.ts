import { Component, Input, SimpleChanges, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { forkJoin } from 'rxjs';

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
  blockChannelsRefreshing: boolean = false;

  constructor(private http: HttpClient, public afs: AngularFirestore){}

  @Input() user: any;

  ngOnChanges(changes: SimpleChanges){
    //If there are channels to display from the database, run getPosts
    //And also make sure replaceChannelOrder() didn't just run and trigger this from that.
    if(this.user.addedChannelIds && this.blockChannelsRefreshing === false){
      console.log('something other than replaceChannelOrder just ran, so DO grab from the server!');

      //display:none existing channels and replace with what is now current in firebase's db, to avoid duplicates.
      let channelsToRemove = document.querySelectorAll('.channel-class');
      for(let i = 0; i < channelsToRemove.length; i++){
        channelsToRemove[i].classList.add('hidden');
      }
      document.querySelectorAll('.hidden').forEach(e => e.classList.remove('channel-class'));

      this.getPosts(this.user.addedChannelIds);
    } else {
      console.log('replaceChannelOrder just ran, so do not grab from the server, bro!');
    }
  }


  getPosts(addedChannelIds){

    let httpCalls: any = new Array(); //an array that will contain all this.http.get calls
    for(let i = 0; i < addedChannelIds.length; i++){
      httpCalls.push(this.http.get(this.ROOT_URL + "bychannelid/" + addedChannelIds[i]));
    }

    //forkJoin makes it so all calls can be done on one .subscribe, instead of multiple .subscribes.
    //This allows the data to render in its proper order, since .subscribe will run separate
    //from any loop it may be inside. (You should not put functions inside a loop for that reason.)
    const combined = forkJoin(
      httpCalls
    )

    //This took me FOREVER to figure out, so in case I forget, here's the links that helped me out:
    //https://stackoverflow.com/questions/23922301/while-or-for-loop-with-http-get
    //https://stackoverflow.com/questions/49377607/preserve-the-order-of-the-http-calls-in-angular
    //https://rxjs-dev.firebaseapp.com/api/index/function/forkJoin
    combined.subscribe(data => {
      for(let i = 0; i < addedChannelIds.length; i++){
        this.channelVideosDetails[i] = data[i];
        this.combinedChannelsArray.push(this.channelVideosDetails[i]);
      }
    })
  }

  receiveBlock($event){
    console.log('event happened');
    this.blockChannelsRefreshing = $event;
  }

  deleteChannel(channel, user){
    this.blockChannelsRefreshing = false;

    //replace UC with UU at the start of channel ID
    let channelIdToRemove = channel.items[0].snippet.channelId.replace(/^.{2}/g, "UU");
    
    //remove specified UU-id from the addedChannelIds array
    this.afs.doc(`users/${user.uid}`).update({
      addedChannelIds: firebase.firestore.FieldValue.arrayRemove(channelIdToRemove)
    });
  }

  replaceChannelOrder(user){
    this.blockChannelsRefreshing = true;

    //Figure out what the existing order of UU-id's in firestore db is
    //and concatenate them into an array that FieldValue.arrayRemove() below can parse.
    let oldOrder: any = new Array();
    for(let i = 0; i < this.user.addedChannelIds.length; i++){
      oldOrder.push(this.user.addedChannelIds[i])
    }

    //Do the same with newOrder.
    /* Detailed explanation for my own reference:
      This works because the UC-id is placed as the id of each channel element.
      When the channels are physically reordered in the HTML, this scals the
      UC-ids of them all and orders them in the new order, after making the
      UC-ids into UU-ids. On trigger, the new order on the front-end will
      be appended to be the new order on the server itself.
    */
    let newOrder: any = new Array();
    for(let i = 0; i < this.user.addedChannelIds.length; i++){
      newOrder.push((document.getElementsByClassName('channel-class')[i].id).replace(/^.{2}/g, 'UU'));
    }

    //Thanks the heavens for this thread, because afaik FieldValue.method.apply(this, var) is undocumented:
    //https://stackoverflow.com/questions/53252265/firestore-pass-array-to-arrayunion
    let removeOldOrder = firebase.firestore.FieldValue.arrayRemove.apply(this, oldOrder);
    let replaceWithNewOrder = firebase.firestore.FieldValue.arrayUnion.apply(this, newOrder);
    
    let docReference = this.afs.doc(`users/${user.uid}`);

    docReference.update({addedChannelIds: removeOldOrder});
    docReference.update({addedChannelIds: replaceWithNewOrder});

  }

}
