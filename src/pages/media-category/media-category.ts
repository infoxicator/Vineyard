import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {HomeService} from '../home/home.service'

/*
  Generated class for the MediaCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-media-category',
   providers: [HomeService],
  templateUrl: 'media-category.html'
})
export class MediaCategoryPage {
  category: any;
  videos = [];

  constructor(public navCtrl: NavController, private navParams: NavParams, private homeService:HomeService) {
      this.category = navParams.get('category');
      this.homeService.getVideosByCategory(this.category.id)
      .then(videos => this.videos = videos)
      .then(next => console.log(this.videos));
  }
  ionViewDidLoad() {
    console.log('Hello MediaCategoryPage Page');         
  }

}
