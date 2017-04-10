import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../home/home.service'
/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  providers: [HomeService],
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  churchEvent:any;
 constructor(public navCtrl: NavController,  private navParams: NavParams, public homeService: HomeService) {
      this.churchEvent = navParams.get('churchEvent');
      if(!this.churchEvent.id){
        homeService.getPost(this.churchEvent)
      .subscribe(eventPost => {
      this.churchEvent = eventPost;
      console.log(this.churchEvent);
      }, error => {
        alert('error getting event');
      });
      }
      //console.log(this.churchEvent);
  }

}
