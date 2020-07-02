import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChannelsListComponent } from './channels-list/channels-list.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import {SortablejsModule} from 'ngx-sortablejs';
import { ChannelsListGridComponent } from './channels-list-grid/channels-list-grid.component';
import { DeleteChannelComponent } from './delete-channel/delete-channel.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { FooterComponent } from './footer/footer.component';
import { SimplebarAngularModule } from 'simplebar-angular';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsListComponent,
    HeaderComponent,
    SearchComponent,
    ChannelsListGridComponent,
    DeleteChannelComponent,
    MainComponentComponent,
    LoggedOutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    SortablejsModule,
    SortablejsModule.forRoot({ animation: 150, handle: ".drag-overlay" }),
    SimplebarAngularModule,
    RouterModule.forRoot([

    ])
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
