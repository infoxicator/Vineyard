import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import {HomeService} from '../home/home.service'
import { LoadingController } from 'ionic-angular';

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
  arrayOfKeys =[];
  slider = [];
  sliderOptions = {
    initialSlide: 2,
    loop: true,
    autoplay:2000,
    autoplayDisableOnInteraction: false
  };

  map: any;
  mapInitialised: boolean = false;
  apiKey: any ="AIzaSyAREiBD0jH1edwsi-pRAnoytslyOAojRqY";
  constructor(public navCtrl: NavController, private homeService:HomeService, public connectivityService: ConnectivityService,
  public loadingCtrl: LoadingController) {
  this.loader.present();
  this.loadGoogleMaps();
  this.homeService.getPage(1104)
    .then(page => {
      this.slider = page.acf;
      this.arrayOfKeys = Object.keys(this.slider);
    })
    .then(() =>{
          this.loader.dismiss()
       }).catch(error => {
         alert('error');
       });
  }

  loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
 
    } 
  }
  else {
 
    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }
 
  }
 
  initMap(){
    this.mapInitialised = true;
      let latLng = new google.maps.LatLng(50.8341173, -0.1513398);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        draggable:false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
  }
 
  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }
  addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h5>Doing church 10:30 am sundays...</h5><p>BHASVIC College</p>";          
 
  this.addInfoWindow(marker, content);
 
}
  ionViewDidLoad() {
     setTimeout(() => {
       this.loaded = true;
     }, 1000);
   }

}
