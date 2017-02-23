import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {MediaCategoryPage} from '../media-category/media-category'

@Component({
  selector: 'page-video-playlists',
   providers: [HomeService],
  templateUrl: 'video-playlists.html'
})
export class VideoPlaylistsPage {
videoAlbums: any;
grid: Array<Array<string>>;

  constructor(public navCtrl: NavController,  private navParams: NavParams,  private homeService:HomeService) {
      this.videoAlbums = navParams.get('videoAlbums');
      this.grid = homeService.createGrid(this.videoAlbums);
      //console.log(this.grid);
  }
     categoryTapped(event, category){
    this.navCtrl.push(MediaCategoryPage, {
      category: category
    })
  }

}
