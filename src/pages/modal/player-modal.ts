import { Component, ViewChild, Renderer } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController, ActionSheetController, LoadingController, Platform} from 'ionic-angular';
import { HomeService } from '../home/home.service'
import Player from '@vimeo/player';

@Component({
  selector: 'page-player-modal',
  providers: [HomeService],
  templateUrl: 'player-modal.html'
})
export class PlayerModal {

  @ViewChild('iframe') iframe;
  @ViewChild('vimeoplayer') div;
  video: any;
  videoId: number;
  currentVideo: any;
  iframeElement: any;
  videoLoaded: boolean;
  watchLaterList: any;
  watchLaterLoaded: boolean;
  player: any;
//  public loader = this.loadingCtrl.create( {duration: 60000});

  constructor(navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, public homeService: HomeService,
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public plt: Platform) {
    this.homeService.getWatchLaterList()
      .then(watchLaterList => {
      this.watchLaterList = watchLaterList;
        this.watchLaterLoaded = true;
      });

    this.video = navParams.get('videoel');
    this.videoId = homeService.getVimeoId(this.video.link);
    this.currentVideo = this.video;
    console.log('Video Object', navParams.get('videoel'));
    //console.log(this.el);
  }
  createLoader() {
  return this.loadingCtrl.create({
    duration: 30000
  });
}
  removeFromList(videoToRemove) {
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
        }, {
          text: 'Share',
          icon: 'paper-plane',
          handler: () => {
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
  ionViewDidLoad() {
    //this.iframeElement = this.renderer.selectRootElement("iframe");
    //this.player = new Player(this.iframeElement);
    this.player = new Player(this.div.nativeElement, {
    id: this.videoId})
     if (this.plt.is('ios')) {
      // This will only print when on iOS, Hidding the auto play since apple doesnt support it without user interaction
      //console.log("I'm an iOS device!");
    }else{
      //console.log('this is android');
      this.player.play().then(function () {
      // the video was played
    }).catch(function (error) {
      switch (error.name) {
        case 'PasswordError':
          // the video is password-protected and the viewer needs to enter the
          // password first
          break;

        case 'PrivacyError':
          // the video is private
          break;

        default:
          // some other error occurred
          break;
      }
    });
    }
   
  }
  playNewVideo(videoLater) {
    let loading = this.createLoader();
    let vimeoId = this.homeService.getVimeoId(videoLater.link)
    if(vimeoId && this.player){
    loading.present()
    this.player.loadVideo(vimeoId).then(() => {
    this.currentVideo = videoLater;
     loading.dismiss();
     if (this.plt.is('ios')) {
       
      // This will only print when on iOS, Hidding the auto play since apple doesnt support it without user interaction
      //console.log("I'm an iOS device!");
    }else{
      //console.log('this is android');
    this.player.play();
  }
    }).catch(function (error) {
   if(loading){
      loading.dismiss();
    }
      
      switch (error.name) {
        case 'TypeError':
          // the id was not a number
          break;

        case 'PasswordError':
          // the video is password-protected and the viewer needs to enter the
          // password first
          break;

        case 'PrivacyError':
          // the video is password-protected or private
          break;

        default:
          // some other error occurred
          break;
      }
    });
  }
}


  dismiss() {
    this.viewCtrl.dismiss();
  }

}