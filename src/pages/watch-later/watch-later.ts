import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, LoadingController } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {MediaCategoryPage} from '../media-category/media-category'
import {PlayerModal} from '../modal/player-modal'
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-watch-later',
  providers: [HomeService],
  templateUrl: 'watch-later.html'
})
export class WatchLaterPage {

  watchLaterList: any;


  constructor(public navCtrl: NavController,  private navParams: NavParams,  public homeService:HomeService,
  public modalCtrl: ModalController, public sanitizer: DomSanitizer, 
   public actionSheetCtrl: ActionSheetController) {
      this.watchLaterList = navParams.get('watchLaterList');
  }

    playVideo(event, videoel){
      videoel.embed.html = this.sanitizer.bypassSecurityTrustHtml(videoel.embed.html);
    console.log(videoel);
   let playerModal = this.modalCtrl.create(PlayerModal, { videoel });
   playerModal.present();
  }

  removeFromList(videoToRemove){
    const index = this.watchLaterList.find(it => it.uri === videoToRemove.uri)
    this.watchLaterList.splice(index, 1);
    this.homeService.deleteFromWatchlaterList(videoToRemove);
  }


   presentActionSheet(videoTapped) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Remove from Watch Later',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.removeFromList(videoTapped);
          }
        },{
          text: 'Share',
          icon: 'paper-plane',
          handler: () => {
            //this.homeService.deleteFromWatchlaterList(videoTapped);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('Hello WatchLaterPage Page');
  }

}
