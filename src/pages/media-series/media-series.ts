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
  videoCategories = [];
  talksCategories = [];
  seriesSegment = 'videos';
  constructor(public navCtrl: NavController, private homeService:HomeService) {
      this.homeService.getVideoCategory()
      .then(videoCategories => this.videoCategories = videoCategories);
       this.homeService.getTalksCategory()
      .then(talksCategories => this.talksCategories = talksCategories);
  }
   categoryTapped(event, categoryId){
    this.navCtrl.push(MediaCategoryPage, {
      categoryId: categoryId
    })
  }

  ionViewDidLoad() {
    console.log('Hello MediaSeriesPage Page');
  }

}
