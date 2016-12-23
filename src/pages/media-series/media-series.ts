import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {MediaCategoryPage} from '../media-category/media-category'

/*
  Generated class for the MediaSeries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-media-series',
   providers: [HomeService],
  templateUrl: 'media-series.html'
})
export class MediaSeriesPage {
  videoAlbums = [];
  videoChannels = [];
  seriesSegment = 'videos';
  constructor(public navCtrl: NavController, private homeService:HomeService) {
      this.homeService.getVideoAlbums()
      .then(videoAlbums => this.videoAlbums = videoAlbums.data);
       this.homeService.getVideoChannels()
      .then(videoChannels => this.videoChannels = videoChannels.data);
  }
   categoryTapped(event, category){
    this.navCtrl.push(MediaCategoryPage, {
      category: category
    })
  }

  ionViewDidLoad() {
    console.log('Hello MediaSeriesPage Page');
  }

}
