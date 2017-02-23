import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-newspost',
  templateUrl: 'newspost.html'
})
export class NewspostPage {

  newsPost:any;
 constructor(public navCtrl: NavController,  private navParams: NavParams, sanitizer: DomSanitizer) {
      this.newsPost = navParams.get('newsPost');
      this.newsPost.content.rendered = sanitizer.bypassSecurityTrustHtml(this.newsPost.content.rendered);
      //console.log(this.newsPost);
  }

}
