import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {MediaCategoryPage} from '../media-category/media-category'
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-media-series',
   providers: [HomeService],
  templateUrl: 'media-series.html'
})
export class MediaSeriesPage {
  public loader = this.loadingCtrl.create();
  videoAlbums = [];
  videoChannels = [];
  seriesSegment = 'videos';
  constructor(public navCtrl: NavController, private homeService:HomeService, public loadingCtrl: LoadingController) {
      this.loader.present();
      this.homeService.getVideoAlbums()
      .then(videoAlbums => this.videoAlbums = videoAlbums.data);
       this.homeService.getVideoChannels()
      .then(videoChannels => this.videoChannels = videoChannels.data)
      .then(() =>{
          this.loader.dismiss()
       });
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
