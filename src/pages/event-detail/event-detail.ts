import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  churchEvent:any;
 constructor(public navCtrl: NavController,  private navParams: NavParams) {
      this.churchEvent = navParams.get('churchEvent');
      console.log(this.churchEvent);
  }

  ionViewDidLoad() {
    console.log('Hello EventDetailPage Page');
      
  }

}
