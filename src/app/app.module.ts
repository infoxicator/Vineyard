import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SecToMinPipe } from './sectomin.pipe';
//External libraries
import { Ng2MapModule} from 'ng2-map';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import {MomentModule} from 'angular2-moment';
//Pages Imports
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {PostDetailPage} from '../pages/post-detail/post-detail'
import {TalksPage} from '../pages/talks/talks'
import { MediaSeriesPage } from '../pages/media-series/media-series';
import { MediaCategoryPage } from '../pages/media-category/media-category';
import { EventDetailPage } from '../pages/event-detail/event-detail';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PostDetailPage,
    TalksPage,
    MediaSeriesPage,
    MediaCategoryPage,
    EventDetailPage,
    ElasticHeader,
    SecToMinPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp), Ng2MapModule, MomentModule
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PostDetailPage,
    TalksPage,
    MediaSeriesPage,
    EventDetailPage,
    MediaCategoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
