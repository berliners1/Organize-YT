import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css']
})
export class LoggedOutComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    /**
     * Add a master loading indicator over logged-out component for ~5 seconds 
     * before showing logged-out content.
     * This isn't a perfectly idea solution, but I could find no other way
     * to prevent the "you are signed out" screen from showing for
     * logged in users who simply refresh the page, while auth is waiting
     * to figure out if they're really logged in or not.
     */
    setTimeout(function(){
      document.querySelector('.loading-indicator').classList.remove('active');
      if(document.querySelector('.logged-out-loading')){
        document.querySelector('.logged-out-loading').classList.add('hidden');
        document.querySelector('.logged-out-available').classList.remove('hidden');
      }
    }, 5500);
  }

}
