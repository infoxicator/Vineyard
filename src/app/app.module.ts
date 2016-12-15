import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//External libraries
import { Ng2MapModule} from 'ng2-map';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
//Pages Imports
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {PostDetailPage} from '../pages/post-detail/post-detail'
import {TalksPage} from '../pages/talks/talks'
import { MediaSeriesPage } from '../pages/media-series/media-series';
import { MediaCategoryPage } from '../pages/media-category/media-category';

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
    ElasticHeader
  ],
  imports: [
    IonicModule.forRoot(MyApp), Ng2MapModule
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
    MediaCategoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
