import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from './home.service'
import { TalksPage } from '../talks/talks'
import { EventDetailPage } from '../event-detail/event-detail'
import {ChurchPage} from '../church/church'
import { PlayerModal } from '../modal/player-modal'
import { SocialSharing } from '@ionic-native/social-sharing';
//import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform, NavController, ModalController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-home',
  providers: [HomeService],
  templateUrl: 'home.html'
})
export class HomePage {
  public loader = this.loadingCtrl.create({ duration: 60000 });
  churchEvents: any;
  latestPosts: any;
  nextDay: Date;
  homeSegment = 'events';
  contentLoaded: boolean;
  payload: any;
  pushVideoId: number;
  constructor(public platform: Platform, public navCtrl: NavController, public homeService: HomeService,
    public loadingCtrl: LoadingController, storage: Storage, public modalCtrl: ModalController, public sanitizer: DomSanitizer,
    public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController, private socialSharing: SocialSharing,
    private oneSignal: OneSignal) {
    //this.loader.present();
    this.nextDay = new Date();
    homeService.getChurchEvents()
      .subscribe(churchEvents => {
      this.churchEvents = churchEvents;
        this.contentLoaded = true;
      }, error => {
        storage.get('churchEvents').then((churchEvents) => {
          this.contentLoaded = true;
          this.churchEvents = churchEvents;
        })
      });
    homeService.getLatestPosts()
      .subscribe(latestPosts => {
      this.latestPosts = latestPosts;
      }, error => {
        storage.get('latestPosts').then((latestPosts) => {
          this.latestPosts = latestPosts;
        })
      });
  }
  doRefresh(refresher) {
    this.homeService.getChurchEvents()
      .subscribe(churchEvents => {
      this.churchEvents = churchEvents;
        this.contentLoaded = true;
        refresher.complete();
      }, error => {
        refresher.complete();

      });
    this.homeService.getLatestPosts()
      .subscribe(latestPosts => {
      this.latestPosts = latestPosts;
      }, error => {

      });
  }


itemTapped(event, talk){
  this.navCtrl.push(TalksPage, {
    talk: talk
  })
}
eventTapped(event, churchEvent){
  this.navCtrl.push(EventDetailPage, {
    churchEvent: churchEvent
  })
}
playVideo(event, videoel){
  videoel.embed.html = this.sanitizer.bypassSecurityTrustHtml(videoel.embed.html);
  //console.log(videoel);          
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
      }, {
        text: 'Share',
        icon: 'paper-plane',
        handler: () => {
          this.share(videoTapped);
          //this.homeService.deleteFromWatchlaterList(videoTapped);
        }
      }, {
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

  this.socialSharing.shareWithOptions(options).catch(() => {
    alert('Error sharing content, please try again');
  });

}  

ionViewDidLoad() {
  this.platform.ready().then(() => {
  this.oneSignal.startInit('0f98c8b0-14a4-42b4-94bc-8806115cd92b', '290756966930');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        if(data.notification.payload.additionalData.event){            
          this.navCtrl.push(EventDetailPage, {
            churchEvent: data.notification.payload.additionalData.event
          })
        }
        if(data.notification.payload.additionalData.page){            
          this.navCtrl.push(ChurchPage, {
            churchPage: data.notification.payload.additionalData.page
          })
        }
        if(data.notification.payload.additionalData.video){
           let pushVideoId = data.notification.payload.additionalData.video;
           let playerModal = this.modalCtrl.create(PlayerModal, {pushVideoId: pushVideoId});
           playerModal.present();
        }
      });
  
      this.oneSignal.endInit();

  })
 }

}



