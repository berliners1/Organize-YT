import { Component, Input, SimpleChanges, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-channels-list-grid',
  templateUrl: './channels-list-grid.component.html',
  styleUrls: ['./channels-list-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChannelsListGridComponent {

  constructor(public afs: AngularFirestore){}

  @Input() user: any;
  @Input() combinedChannelsArray: any;

  @Output() blockChannelsRefreshing = new EventEmitter<boolean>();

  replaceChannelOrder(user){
    console.log('replaceChannelOrder');
    this.blockRefresh();

    //Figure out what the existing order of UU-id's in firestore db is
    //and concatenate them into an array that FieldValue.arrayRemove() below can parse.
    let oldOrder: any = new Array();
    for(let i = 0; i < this.user.addedChannelIds.length; i++){
      oldOrder.push(this.user.addedChannelIds[i])
    }

    //Do the same with newOrder.
    /* Detailed explanation for my own reference:
      This works because the UC-id is placed as the id of each channel element.
      When the channels are physically reordered in the HTML, this scans the
      UC-ids of them all and orders them in the new order, after making the
      UC-ids into UU-ids. On trigger, the new order on the front-end will
      be appended to be the new order on the server itself.
    */
    let newOrder: any = new Array();
    for(let i = 0; i < this.user.addedChannelIds.length; i++){
      newOrder.push((document.getElementsByClassName('channel-class')[i].id).replace(/^.{2}/g, 'UU'));
    }

    //Thank the heavens for this thread, because afaik FieldValue.method.apply(this, var) is undocumented:
    //https://stackoverflow.com/questions/53252265/firestore-pass-array-to-arrayunion
    let removeOldOrder = firebase.firestore.FieldValue.arrayRemove.apply(this, oldOrder);
    let replaceWithNewOrder = firebase.firestore.FieldValue.arrayUnion.apply(this, newOrder);
    
    let docReference = this.afs.doc(`users/${user.uid}`);

    docReference.update({addedChannelIds: removeOldOrder});
    docReference.update({addedChannelIds: replaceWithNewOrder});

    this.disableEditMode();
  }

  revertChannelOrder(user){
    console.log('revertChannelOrder');
    this.dontBlockRefresh();

    let oldOrder: any = new Array();
    for(let i = 0; i < this.user.addedChannelIds.length; i++){
      oldOrder.push(this.user.addedChannelIds[i])
    }

    let removeOldOrder = firebase.firestore.FieldValue.arrayRemove.apply(this, oldOrder);
    let replaceWithNewOrder = firebase.firestore.FieldValue.arrayUnion.apply(this, oldOrder);
    
    let docReference = this.afs.doc(`users/${user.uid}`);

    docReference.update({addedChannelIds: removeOldOrder});
    docReference.update({addedChannelIds: replaceWithNewOrder});

    this.disableEditMode();
  }

  blockRefresh(){
    this.blockChannelsRefreshing.emit(true);
  }
  dontBlockRefresh(){
    this.blockChannelsRefreshing.emit(false);
  }

  //receive block event from app-delete-channel component
  //and pass it through to app-channel-list component
  receiveBlock($event){
    console.log('to block:' + $event);
    this.blockChannelsRefreshing.emit($event);
  }

  enableEditMode(){
    document.querySelector('.channel-list-section').classList.add('edit-mode');
  }
  disableEditMode(){
    document.querySelector('.channel-list-section').classList.remove('edit-mode');
  }


}
