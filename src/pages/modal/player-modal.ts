import { Component, ViewChild, Renderer } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
 selector: 'page-player-modal',
  templateUrl: 'player-modal.html'
})
export class PlayerModal {
    
@ViewChild('iframe') iframe;
video:any;
iframeElement:any;
videoLoaded:boolean;

 constructor(navParams: NavParams, public viewCtrl: ViewController, public renderer : Renderer) {
     
     this.video = navParams.get('videoel');
   console.log('Video Object', navParams.get('videoel'));
   //console.log(this.el);
 }
 ionViewDidLoad() {
     this.iframeElement = this.renderer.selectRootElement("iframe");  
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}