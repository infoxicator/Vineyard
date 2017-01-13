import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {NewspostPage} from '../newspost/newspost'

/*
  Generated class for the News page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  providers: [HomeService],
  templateUrl: 'news.html'
})
export class NewsPage {
 newsCategory:any;
 news:any;
  constructor(public navCtrl: NavController,  private navParams: NavParams, private homeService:HomeService) {
      this.newsCategory = navParams.get('newsCategory');
       this.homeService.getPostsByCategory(this.newsCategory.name)
    .then(news => {this.news = news;
      console.log(this.news);
    })
  }
   postTapped(event, newsPost){
   this.navCtrl.push(NewspostPage, {
      newsPost: newsPost})
      }
  ionViewDidLoad() {
    console.log('Hello NewsPage Page');
  }

}
