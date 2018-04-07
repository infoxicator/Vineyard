import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../home/home.service'

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
      }, error => {
        alert('error getting event');
      });
      }
  }

}
