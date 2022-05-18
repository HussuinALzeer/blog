import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NavComponent } from './nav/nav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenaveComponent } from './nav/sidenave/sidenave.component';
import { MaterialModule } from './material/material.module';
import { SigninComponent } from './auth/signin/signin.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { AuthReducer } from './store/reducers/nav.reduer';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { reducers } from './app.reducer';
import { PostsModule } from './posts/posts.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SnakbarComponent } from './snakbar/snakbar.component'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MainComponent } from './main/main.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    LoginComponent,
    SidenaveComponent,
    SigninComponent,
    SnakbarComponent,
    MainComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    PostsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
