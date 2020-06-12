import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, analytics } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import{
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { User } from './user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
        
      })
    );
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut(){
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      addedChannelIds: []
    };

    return userRef.set(data, {merge: true});
  }

  /*
  private createUserData(userData){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${userData.uid}`);
    const data = {
      uid: userData.uid,
      addedChannelIds: userData.addedChannelIds
    };

    return userRef.set(userData, {merge: true});
  }
  */
  
}
