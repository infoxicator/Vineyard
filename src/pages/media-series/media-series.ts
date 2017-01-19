import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
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
  videoAlbums: any;
  videoChannels: any;
  seriesSegment = 'videos';
  constructor(public navCtrl: NavController, private homeService:HomeService, public loadingCtrl: LoadingController, 
  storage: Storage) {
     // this.loader.present();
      homeService.getVideoAlbums()
      .subscribe(videoAlbums => {this.videoAlbums = videoAlbums;
        }, error =>{storage.get('videoAlbums').then((videoAlbums) => {
                         this.videoAlbums = videoAlbums;
                        })
        });      
      homeService.getVideoChannels()
      .subscribe(videoChannels => {this.videoChannels = videoChannels;
        }, error =>{storage.get('videoChannels').then((videoChannels) => {
                         this.videoChannels = videoChannels;
                        })
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
