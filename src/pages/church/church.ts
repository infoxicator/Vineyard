import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../home/home.service'

@Component({
  selector: 'page-church',
  providers: [HomeService],
  templateUrl: 'church.html'
})
export class ChurchPage {
     churchPage:any;
 constructor(public navCtrl: NavController,  private navParams: NavParams, public homeService: HomeService) {
      this.churchPage = navParams.get('churchPage');
      if(!this.churchPage.id){
        homeService.getPage(this.churchPage)
      .subscribe(churchPage => {
      this.churchPage = churchPage;
      }, error => {
        alert('error getting page');
      });
    }
  }
}
