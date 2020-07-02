import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { active } from 'sortablejs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public afs: AngularFirestore, private http: HttpClient) { }

  @Input() user: any;
  public getPostsStatusSubs: boolean;
  @Output() blockChannelsRefreshing = new EventEmitter<boolean>();
  channelId: string = '';
  httpCalls: any;
  allUserChannelsData: any;
  public showPopup: boolean = true;
  public allowChannelComparisons: boolean = false;
  public submitButtonEnabled: boolean = false;

  newList: any = new Array();
  existingList: any = new Array();
  combinedItems: any = new Array();


  //calling api to get subscribers
  getYourSubscribers() {
    this.getPostsStatusSubs = true; //initiate loading for getting subsciptions
    let URL = "https://organize-yt.azurewebsites.net/api/youtube/bychannelsearch/" + this.channelId;
    this.httpCalls = this.http.get(URL);
    this.httpCalls.subscribe(data => {
      console.log(data);
      this.allUserChannelsData = data; //the html loops over the content in this.
      this.getPostsStatusSubs = false; //deactivate loading
      document.querySelector('.popup-search-bar').classList.add('active');

      setTimeout(() => {
        console.log('checked in getYourSubscribers httpcal completed');
        this.checkIfAddedToPopup();
      }, 100);

    });
    document.querySelector('.call-popup-button').classList.add('hide');
    document.querySelector('.just-popup-button').classList.remove('hide');
  }

  getSubscriptionChannelId(i) {
    this.blockRefresh();
    console.log('clicked');
    console.log(i);

    //make theId equal to #id of selected element, and regex it to be an insertable UU-id.
    let theId = document.querySelector('.subscription-' + i).id.replace(/^.{7}/g, "UU");

    //if clicked .channel-item doesn't have .selected, add it. Otherwise, remove it.
    if (document.querySelector('.subscription-' + i).classList.contains('selected')) {
      document.querySelector('.subscription-' + i).classList.remove('selected');
    } else {
      document.querySelector('.subscription-' + i).classList.add('selected');
    }

    //compile the list of updated channel Ids to an array called newList.
    //make sure theId doesn't already exist. If it does, remove it from the array.
    if (this.newList.indexOf(theId) > -1) {
      console.log('id already exists, removing');
      this.newList = this.newList.filter(item => item !== theId);
    } else {
      console.log('id is unique, adding');
      this.newList.push(theId);
    }

    //check if the user has made a selection, and only enable the submit button if they have.
    this.disableButtonIfNewListIsEmpty();

    //get the existing ids already in addedChannelIds, 
    let existingList: any = new Array();
    for (let i = 0; i < this.user.addedChannelIds.length; i++) {
      existingList.push(this.user.addedChannelIds[i]);
    }
    this.existingList = existingList;

    //and add the newly selected items onto it.
    let combinedItems: any = new Array();
    combinedItems = existingList.concat(this.newList);
    this.combinedItems = combinedItems;

    console.log('in getSubscriptionChannelId')
    console.log(this.newList);
    console.log(this.existingList);
    console.log(this.combinedItems);
  }

  clearSelection() {
    //Clear what is visibly selected in the list
    let activeSelections = document.getElementsByClassName('selected');
    while (activeSelections.length > 0) {
      activeSelections[0].classList.remove('selected');
    }

    //make the arrays of selected items empty.
    this.newList = [];
    this.combinedItems = [];

    this.disableButtonIfNewListIsEmpty();
  }

  disableButtonIfNewListIsEmpty() {
    console.log('newList length:');
    console.log(this.newList.length);

    if (this.newList.length > 0) {
      this.submitButtonEnabled = true;
    } else {
      this.submitButtonEnabled = false;
    }
  }

  //function to add strings to addedChannelIds array
  //https://firebase.google.com/docs/firestore/manage-data/add-data#web_12
  addChannelsToArray(user) {
    this.dontBlockRefresh();

    console.log('in addChannelsToArray');
    console.log(this.newList);
    console.log(this.existingList);
    console.log(this.combinedItems);

    let docReference = this.afs.doc(`users/${user.uid}`);

    //remove the old list, if there are any items in this.existingList.
    if (this.existingList.length > 0 && this.combinedItems.length > this.existingList.length) {
      let removeOldOrder = firebase.firestore.FieldValue.arrayRemove.apply(this, this.existingList);
      docReference.update({ addedChannelIds: removeOldOrder });
    }

    //replace it with the new & updated list, if combinedItems is bigger than existingList.
    if (this.combinedItems.length > this.existingList.length) {
      console.log('does this run');
      let replaceWithNewOrder = firebase.firestore.FieldValue.arrayUnion.apply(this, this.combinedItems);
      docReference.update({ addedChannelIds: replaceWithNewOrder });
    }

    this.clearSelection();

  }

  dontBlockRefresh() {
    this.blockChannelsRefreshing.emit(false);
  }
  blockRefresh() {
    this.blockChannelsRefreshing.emit(true);
  }

  //Function to check if an existing channel shows up in the popup, and thus should be non-selectable (grayed-out)
  checkIfAddedToPopup() {
    this.blockRefresh();
    if (document.getElementsByClassName("channel-class").length > 0) {
      console.log('check run');

      if (document.getElementsByClassName('hidden').length > 0) {
        document.querySelectorAll('.hidden').forEach(e => e.removeAttribute('id'));
        document.querySelectorAll('.hidden').forEach(e => e.classList.remove('channel-class'));
      }

      //var for UC-id
      let channelsRendered = document.querySelectorAll('.channel-class');
      let channelsRenderedIds: any = new Array();
      for (let i = 0; i < channelsRendered.length; i++) {
        channelsRenderedIds.push(channelsRendered[i].id);
      }

      //var for list-UCid
      let channelsToAdd = document.querySelectorAll('.channel-item');
      if (document.getElementsByClassName('channel-item').length > 0) {
        for (let i = 0; i < document.getElementsByClassName('channel-item').length; i++) {
          if (document.querySelector('.subscription-' + i).classList.contains('gray-out')) {
            document.querySelector('.subscription-' + i).classList.remove('gray-out');
          }

        }
      }

      for (let i = 0; i < channelsToAdd.length; i++) {
        if (channelsRenderedIds.includes((channelsToAdd[i].id).replace(/^.{5}/g, ""))) {
          document.querySelector('.subscription-' + i).classList.add('gray-out');
        }
      }
    }
  }

  ngDoCheck() {

    //If the loading indicator exists
    if (document.getElementsByClassName('loading-indicator-subslist').length > 0) {
      if (this.getPostsStatusSubs) {
        //show the loading indicator
        document.querySelector('.loading-indicator-subslist').classList.add('active');
      } else {
        //hide the loading indicator
        document.querySelector('.loading-indicator-subslist').classList.remove('active');
      }
    }

    //If any channel items exist
    //maybe make a change so this only runs after Add Channels button is clicked.
    if (document.getElementsByClassName('channel-item').length > 0 && this.allowChannelComparisons === true) {
      //100ms delay before checking
      setTimeout(() => {
        console.log('checked in ngDoCheck (should only be allowed to run once per plus click)');
        this.checkIfAddedToPopup();
        this.allowChannelComparisons = false; //only allow to run once, until + button is clicked again.
      }, 100);

    }

  }

}
