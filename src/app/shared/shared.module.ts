import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StatePickerComponent } from './components/state-picker/state-picker.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { BadgeComponent } from './components/badge/badge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { PastorComponent } from './components/pastor/pastor.component';
import { BioComponent } from './components/bio/bio.component';
import { SafePipe } from './pipes/safe.pipe';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { AgoPipe } from './pipes/ago.pipe';
import { TopicsComponent } from './components/topics/topics.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { ZipCodePipe } from './pipes/zip-code.pipe';
import { VideoRecentComponent } from './components/video-recent/video-recent.component';
import { SocialComponent } from './components/social/social.component';
import { TruncPipe } from './pipes/trunc.pipe';
import { NoFoundComponent } from './components/no-found/no-found.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderMainComponent,
    BadgeComponent,
    StatePickerComponent,
    ConfirmPopupComponent,
    PastorComponent,
    BioComponent,
    SafePipe,
    AgoPipe,
    ZipCodePipe,
    VideoPlayerComponent,
    TopicsComponent,
    VideoListComponent,
    VideoRecentComponent,
    SocialComponent,
    NoFoundComponent,
    ZipCodePipe,
    TruncPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    HeaderMainComponent,
    BadgeComponent,
    StatePickerComponent,
    ConfirmPopupComponent,
    PastorComponent,
    BioComponent,
    SafePipe,
    AgoPipe,
    ZipCodePipe,
    TruncPipe,
    VideoPlayerComponent,
    TopicsComponent,
    VideoListComponent,
    VideoRecentComponent,
    SocialComponent,
    NoFoundComponent,
  ]
})
export class SharedModule { }
