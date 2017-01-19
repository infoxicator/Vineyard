import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HomeService} from './home.service'
import {TalksPage} from '../talks/talks'
import {EventDetailPage} from '../event-detail/event-detail'
//import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  providers: [HomeService],
  templateUrl: 'home.html'
})
export class HomePage {
   public loader = this.loadingCtrl.create( {duration: 60000});
  churchEvents: any;
  latestPosts: any;
  nextDay: Date;
  homeSegment = 'events';
   constructor(public navCtrl: NavController, private homeService:HomeService,
   public loadingCtrl: LoadingController, storage: Storage) {
      //this.loader.present();
     this.nextDay = new Date();
      homeService.getChurchEvents()
      .subscribe(churchEvents => {this.churchEvents = churchEvents;
        }, error =>{storage.get('churchEvents').then((churchEvents) => {
                         this.churchEvents = churchEvents;
                        })
        });
      homeService.getLatestPosts()
       .subscribe(latestPosts => {this.latestPosts = latestPosts;
         }, error => {storage.get('latestPosts').then((latestPosts) => {
                         this.latestPosts = latestPosts;
                        })
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

 
 

