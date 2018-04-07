import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SecToMinPipe } from './sectomin.pipe';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
//External libraries
import { ParallaxHeader } from '../components/parallax-header/parallax-header';
import {MomentModule} from 'angular2-moment';

//Pages Imports
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {TalksPage} from '../pages/talks/talks'
import { MediaSeriesPage } from '../pages/media-series/media-series';
import { MediaCategoryPage } from '../pages/media-category/media-category';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import {ChurchPage} from '../pages/church/church'
import {NewsPage} from '../pages/news/news'
import { NewspostPage } from '../pages/newspost/newspost'
import { PlayerModal } from '../pages/modal/player-modal'
import { VideoPlaylistsPage } from '../pages/video-playlists/video-playlists'
import { VideoChannelsPage } from '../pages/video-channels/video-channels'
import { WatchLaterPage } from '../pages/watch-later/watch-later'
import { HttpModule } from '@angular/http';
import { NguiMapModule} from '@ngui/map';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { CacheImgModule } from '../global/img-cache';
import { ImgCacheService } from '../global/img-cache';
import { OneSignal } from '@ionic-native/onesignal';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TalksPage,
    MediaSeriesPage,
    MediaCategoryPage,
    EventDetailPage,
    ChurchPage,
    NewsPage,
    NewspostPage,
    PlayerModal,
    VideoPlaylistsPage,
    VideoChannelsPage,
    WatchLaterPage,
    SecToMinPipe,
    ParallaxHeader
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
tabsPlacement: 'bottom',
  platforms: {
    android: {
      tabsPlacement: 'top'
    },
    ios: {
      tabsPlacement: 'bottom'
    },
    windows:
    {
      tabsPlacement: 'top'
    }
  }}), IonicStorageModule.forRoot(),
  BrowserModule,
  HttpModule,
   MomentModule,
   NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAREiBD0jH1edwsi-pRAnoytslyOAojRqY'}),
   CacheImgModule.forRoot()
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TalksPage,
    MediaSeriesPage,
    EventDetailPage,
    MediaCategoryPage,
    ChurchPage,
    NewspostPage,
    NewsPage,
    PlayerModal,
    VideoPlaylistsPage,
    VideoChannelsPage,
    WatchLaterPage
  ],
  providers: [
    File,
    StatusBar,
    SplashScreen,
    SocialSharing,
    LaunchNavigator,
    ImgCacheService,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
