import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public auth: AuthService, public afs: AngularFirestore){}

}


