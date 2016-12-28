import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*import { Ng2MapComponent } from 'ng2-map';*/
import {HomeService} from '../home/home.service'
import {YoutubeVideoPlayer} from 'ionic-native';

@Component({
  selector: 'page-contact',
   providers: [HomeService],
  templateUrl: 'contact.html'
})
export class ContactPage {
    loaded = false;
  arrayOfKeys =[];
  slider = [];
  sliderOptions = {
    initialSlide: 2,
    loop: true,
    autoplay:2000,
    autoplayDisableOnInteraction: false
  };
  constructor(public navCtrl: NavController, private homeService:HomeService) {
  /* Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?key=AIzaSyAREiBD0jH1edwsi-pRAnoytslyOAojRqY';*/
 this.homeService.getPage(1104)
    .then(page => {
      this.slider = page.acf;
      this.arrayOfKeys = Object.keys(this.slider);
    })
    .then(log => console.log(this.slider));
  }
  openVideo(){
    YoutubeVideoPlayer.openVideo('gh97zb9WpPQ');
  }
  ionViewDidLoad() {
     setTimeout(() => {
       this.loaded = true;
     }, 1000);
   }

}
