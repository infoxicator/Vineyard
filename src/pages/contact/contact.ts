import { Component, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController } from 'ionic-angular';
//import { ConnectivityService } from '../../providers/connectivity-service';
import { HomeService } from '../home/home.service'
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

declare var google;

@Component({
  selector: 'page-contact',
  providers: [HomeService],
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('map') mapElement: ElementRef;
  public loader = this.loadingCtrl.create();
  loaded = false;
  arrayOfKeys = [];
  slider: any;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any = "AIzaSyAREiBD0jH1edwsi-pRAnoytslyOAojRqY";
  destination:string;
  start:string;

  constructor(public navCtrl: NavController, private homeService: HomeService,
    public loadingCtrl: LoadingController, storage: Storage, private launchNavigator: LaunchNavigator) {
       this.start = "";
    this.destination = "50.8341173, -0.1513398";
    //this.loader.present();
    this.homeService.getSliderPage(1104)
      .subscribe(page => {
      this.slider = page;
      this.loaded = true;
      }, error => {
        storage.get('page').then((page) => {
          this.slider = page;
          this.loaded = true;
        })
      });
  }
  navigate(){
    let options: LaunchNavigatorOptions = {
      start: this.start
    };

    this.launchNavigator.navigate(this.destination, options)
        .then(
            success => //alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    );
  }

  
  showInfoWindow({target:marker}){
    marker.nguiMapComponent.openInfoWindow('iw', marker);

  }

}
