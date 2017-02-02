import { Component, ViewChild, Renderer } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { HomeService } from '../home/home.service'
import Player from '@vimeo/player';

@Component({
  selector: 'page-player-modal',
  providers: [HomeService],
  templateUrl: 'player-modal.html'
})
export class PlayerModal {

  @ViewChild('iframe') iframe;
  video: any;
  iframeElement: any;
  videoLoaded: boolean;
  watchLaterList: any;
  watchLaterLoaded: boolean;
  player: any;

  constructor(navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, public homeService: HomeService,
    public actionSheetCtrl: ActionSheetController) {
    this.homeService.getWatchLaterList()
      .then(watchLaterList => {
      this.watchLaterList = watchLaterList;
        this.watchLaterLoaded = true;
      });

    this.video = navParams.get('videoel');
    console.log('Video Object', navParams.get('videoel'));
    //console.log(this.el);
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
    this.iframeElement = this.renderer.selectRootElement("iframe");
    var options = {
        id: 59777392,
        width: 640,
        loop: true,
        color: '#7f6ffa'
    };
    this.player = new Player(this.iframeElement, options);
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
  playloaded(){
     this.player.play()
  }
  playNewVideo(videoLater) {
    let vimeoId = this.homeService.getVimeoId(videoLater.link)
    console.log(vimeoId);
   this.player.loadVideo(vimeoId).then(function (id) {
      // the video successfully loaded
    }).catch(function (error) {
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

}