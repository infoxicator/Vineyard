import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SecToMinPipe } from './sectomin.pipe';
import { ConnectivityService } from '../providers/connectivity-service';
import { Storage } from '@ionic/storage';
//External libraries
//import { Ng2MapModule} from 'ng2-map';
import { ParallaxHeader } from '../components/parallax-header/parallax-header';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import {MomentModule} from 'angular2-moment';
import { LazyImgComponent } from '../global/components/';
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
    ElasticHeader,
    LazyImgComponent,
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
    }}), MomentModule//, Ng2MapModule
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
    WatchLaterPage,
    LazyImgComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ConnectivityService, Storage]
})
export class AppModule {}
