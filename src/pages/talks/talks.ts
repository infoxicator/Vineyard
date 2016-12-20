import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the Talks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-talks',
  templateUrl: 'talks.html'
})
export class TalksPage {
 talk: any;
  constructor(public navCtrl: NavController,  private navParams: NavParams) {
      this.talk = navParams.get('talk');
      console.log(this.talk);
  }

  ionViewDidLoad() {
    console.log('Hello TalksPage Page');
  }

}
