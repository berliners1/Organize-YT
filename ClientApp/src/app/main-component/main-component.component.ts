import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  constructor(public auth: AuthService, public afs: AngularFirestore){}

  @Input() user: any;

  ngOnInit() {
    console.log('main component loaded');
    if(this.user != undefined && !(this.user.addedChannelIds instanceof Array)){
      let newArray: any = new Array();
      newArray.push("");
      console.log(newArray);
      this.afs.doc(`users/${this.user.uid}`).set({addedChannelIds: firebase.firestore.FieldValue.arrayUnion.apply(this, newArray)}, {merge: true});
      this.afs.doc(`users/${this.user.uid}`).update({addedChannelIds: firebase.firestore.FieldValue.arrayRemove.apply(this, newArray)});
    }
  }

}
