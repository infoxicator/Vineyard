import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ModalController } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {MediaCategoryPage} from '../media-category/media-category'
import { VideoPlaylistsPage } from '../video-playlists/video-playlists'
import { VideoChannelsPage } from '../video-channels/video-channels'
import { WatchLaterPage } from '../watch-later/watch-later';
import {PlayerModal} from '../modal/player-modal'
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-media-series',
   providers: [HomeService],
  templateUrl: 'media-series.html'
})
export class MediaSeriesPage {
  videoAlbums: any;
  videoChannels: any;
  watchLaterList: any;
  videosLoaded: boolean;
  channelsLoaded: boolean;
  watchLaterLoaded: boolean;
  constructor(public navCtrl: NavController, private homeService:HomeService,
  storage: Storage, public sanitizer: DomSanitizer, public modalCtrl: ModalController,) {
     // this.loader.present();
      homeService.getVideoAlbums()
      .subscribe(videoAlbums => {this.videoAlbums = videoAlbums;
         this.videosLoaded = true;
         this.filterAlbums(this.videoAlbums);
        }, error =>{storage.get('videoAlbums').then((videoAlbums) => {
                        this.videosLoaded = true;
                         this.videoAlbums = videoAlbums;
                         this.filterAlbums(this.videoAlbums);
                        })
        });      
      homeService.getVideoChannels()
      .subscribe(videoChannels => {this.videoChannels = videoChannels;
         this.channelsLoaded = true;
        }, error =>{storage.get('videoChannels').then((videoChannels) => {
                         this.channelsLoaded = true;
                         this.videoChannels = videoChannels;
                        })
        });
         
  }
   categoryTapped(event, category){
    this.navCtrl.push(MediaCategoryPage, {
      category: category
    })
  }
    morePlaylists(){
      if(this.videoAlbums){
         this.navCtrl.push(VideoPlaylistsPage, {     
       videoAlbums: this.videoAlbums
    })
      }
      
  }
    moreChannels(){
       if(this.videoChannels){
    this.navCtrl.push(VideoChannelsPage, {     
       videoChannels: this.videoChannels
    })
    }
  }
    seeWatchLater(){
        if(this.watchLaterList){
    this.navCtrl.push(WatchLaterPage, {     
       watchLaterList: this.watchLaterList
        })
      }
  }
    playVideo(event, videoel){
      videoel.embed.html = this.sanitizer.bypassSecurityTrustHtml(videoel.embed.html);
    //console.log(videoel);
   let playerModal = this.modalCtrl.create(PlayerModal, { videoel });
   playerModal.present();
  }


  ionViewWillEnter(){
    this.homeService.getWatchLaterList()
         .then(watchLaterList => {this.watchLaterList = watchLaterList;
         this.watchLaterLoaded = true;
        });         
  }

  filterAlbums(albumsArray) {
       for (let i = 0; i < albumsArray.length; i++){ //iterate images
      if(albumsArray[i].name =="Private"){        
        albumsArray.splice(i, 1);
      }
    };
  }

}
