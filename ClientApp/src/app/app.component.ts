import { Component, Input } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public auth: AuthService, public afs: AngularFirestore){}

  @Input() user: any;

  ngOnInit(){

  }

}


