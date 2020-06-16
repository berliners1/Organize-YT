import { Component, Input, SimpleChanges, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { forkJoin, Subject } from 'rxjs';

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
  public getPostsStatus: boolean;

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
      console.log('replaceChannelOrder just ran, do NOT grab from the server');
    }
  }


  getPosts(addedChannelIds){
    this.getPostsStatus = true; //to notify other components that getPosts is running. Loading, etc.

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
      this.getPostsStatus = false; //to notify other components that getPosts is done running.
    })

  }

  receiveBlock($event){
    console.log('to block:' + $event);
    this.blockChannelsRefreshing = $event;
  }


}
