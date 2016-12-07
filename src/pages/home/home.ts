import { Component } from '@angular/core';
import {HomeService} from './home.service'
import {PostDetailPage} from '../post-detail/post-detail'
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home',
  providers: [HomeService],
  templateUrl: 'home.html'
})
export class HomePage {
  churchEvents= []
  latestPosts= []
  homeSegment = 'events';
   constructor(public navCtrl: NavController, private homeService:HomeService) {
      this.homeService.getChurchEvents()
      .then(churchEvents => this.churchEvents = churchEvents)
      .then(log => console.log(this.churchEvents));
      this.homeService.getLatestPosts()
       .then(latestPosts => this.latestPosts = latestPosts);
   }
    itemTapped(event, post){
    this.navCtrl.push(PostDetailPage, {
      post: post
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

 
 

