import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavController, NavParams, ActionSheetController, ToastController} from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {PlayerModal} from '../modal/player-modal'
import { DomSanitizer} from '@angular/platform-browser';
import { SocialSharing } from 'ionic-native';

@Component({
  selector: 'page-media-category',
   providers: [HomeService],
  templateUrl: 'media-category.html'
})
export class MediaCategoryPage {
  category: any;
  videos : any;
  nextPageUri: any;
  loaded = false;
  sanitizer: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, private homeService:HomeService, sanitizer: DomSanitizer,
   storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
     this.sanitizer = sanitizer;
      this.category = navParams.get('category');
      homeService.getVideosByCategory(this.category.uri)
      .then(videos => {
        this.videos = videos.data;
        this.videos.forEach(video => {
          video.embed.html = sanitizer.bypassSecurityTrustHtml(video.embed.html);
        });
      this.nextPageUri = videos.paging.next;  
      }).catch(error => {
        storage.get('videosByCategory').then((videos) => {
        this.videos = videos.data;
        this.videos.forEach(video => {
          video.embed.html = sanitizer.bypassSecurityTrustHtml(video.embed.html);
        });
      })
      });
  }
   loadMoreVideos(infiniteScroll) {
     //console.log(infiniteScroll);
    //console.log('Begin async operation');
    if(this.nextPageUri){
       this.homeService.getMoreVideos(this.nextPageUri)
      .then(moreVideos =>   {for (let i = 0; i < moreVideos.data.length; i++) {
        moreVideos.data[i].embed.html = this.sanitizer.bypassSecurityTrustHtml(moreVideos.data[i].embed.html);//move to constructor or service
        this.videos.push(moreVideos.data[i]);
      }
     this.nextPageUri = moreVideos.paging.next;  })
      .then(() => infiniteScroll.complete());
    }else{
      infiniteScroll.complete();
    }
   
  }
  playVideo(event, videoel){
   let playerModal = this.modalCtrl.create(PlayerModal, { videoel });
   playerModal.present();
  }
   presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Added to Watch Later',
    duration: 1500,
    position: 'middle'
  });
  toast.present();
}
  saveToWatchLater(videoToSave){
    this.homeService.saveToWatchLaterList(videoToSave);
    this.presentToast();
  }
   presentActionSheet(videoTapped) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Add to Watch Later',
          icon: 'time',
          handler: () => {
            this.saveToWatchLater(videoTapped);
          }
        },{
          text: 'Share',
          icon: 'paper-plane',
          handler: () => {
             this.share(videoTapped);
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
  share(elementToShare){
    var options = {
  message: 'Watch this video on Vimeo:', // not supported on some apps (Facebook, Instagram)
  subject: elementToShare.name, // fi. for email
  files: ['', ''], // an array of filenames either locally or remotely
  url: elementToShare.link,
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}

        SocialSharing.shareWithOptions(options).then(() => {
    }).catch(() => {
    });

  }

}
