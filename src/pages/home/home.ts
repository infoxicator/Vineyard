import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from './home.service'
import { TalksPage } from '../talks/talks'
import { EventDetailPage } from '../event-detail/event-detail'
import { PlayerModal } from '../modal/player-modal'
import { SocialSharing } from 'ionic-native';
//import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, ModalController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';



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
  constructor(public navCtrl: NavController, public homeService: HomeService,
    public loadingCtrl: LoadingController, storage: Storage, public modalCtrl: ModalController, public sanitizer: DomSanitizer,
    public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
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

  SocialSharing.shareWithOptions(options).then(() => {
  }).catch(() => {
  });

}
 ionViewDidLoad() {
    console.log('Hello TalksPage Page');
  }
  
}
     

 /* url: string = 'http://www.brightonvineyard.com/wp-json/wp/v2/posts';
  items: any;
  constructor(public navCtrl: NavController, private http: Http) {}
  ionViewDidEnter(){
    this.http.get(this.url)
    .map(res => res.json())
    .subscribe(data =>{
      this.items = data;
    });
  }*/




