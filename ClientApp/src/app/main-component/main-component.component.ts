import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  constructor(public afs: AngularFirestore){}

  @Input() user: any;

  ngOnInit() {
    //This creates the array addedChannelIds in the User document in Firebase.
    //It needs to be made here with very specific conditions, since it cannot be made in auth.services.
    //Once this is initialized and in place, then the rest of the app can function while safely assuming it exists.
    if(this.user != undefined && !(this.user.addedChannelIds instanceof Array)){
      let newArray: any = new Array();
      //Firebase does not let you push an empty value to create an array. 
      //Instead, I push "", and quickly replace "" with nothing, 
      //and make sure channel-list.ts waits for that to complete before scanning if the array has values or not.
      newArray.push("");
      console.log(newArray);
      this.afs.doc(`users/${this.user.uid}`).set({addedChannelIds: firebase.firestore.FieldValue.arrayUnion.apply(this, newArray)}, {merge: true});
      this.afs.doc(`users/${this.user.uid}`).update({addedChannelIds: firebase.firestore.FieldValue.arrayRemove.apply(this, newArray)});
    }
  }

}
