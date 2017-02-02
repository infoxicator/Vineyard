import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {MediaCategoryPage} from '../media-category/media-category'

@Component({
  selector: 'page-video-channels',
     providers: [HomeService],
  templateUrl: 'video-channels.html'
})
export class VideoChannelsPage {

videoChannels: any;
grid: Array<Array<string>>;

  constructor(public navCtrl: NavController,  private navParams: NavParams,  private homeService:HomeService) {
      this.videoChannels = navParams.get('videoChannels');
      this.grid = homeService.createGrid(this.videoChannels);
      console.log(this.grid);
  }
     categoryTapped(event, category){
    this.navCtrl.push(MediaCategoryPage, {
      category: category
    })
  }

  ionViewDidLoad() {
    console.log('Hello VideoChannelsPage Page');
  }

}
