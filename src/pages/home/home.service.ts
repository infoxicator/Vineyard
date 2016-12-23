import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HomeService {
  private  baseurl: string = 'http://www.brightonvineyard.com/wp-json/wp/v2/';
  private  vimeourl: string = 'https://api.vimeo.com/';
  private vimeotoken: string = '3060da4d95d5aecaf208fef91db3460c';
  events: any;
    constructor(private http:Http){}
    getChurchEvents() {
       return this.http.get(`${this.baseurl}posts/?filter[category_name]=events`)
            .toPromise()
            .then(res => res.json());            
    }
    getLatestPosts() {
       return this.http.get(`${this.vimeourl}channels/brightonvineyard/videos?access_token=${this.vimeotoken}`)
            .toPromise()
            .then(res => res.json());            
    }
    getVideoAlbums() {
        return this.http.get(`${this.vimeourl}users/brightonvineyard/albums?access_token=${this.vimeotoken}`)
            .toPromise()
            .then(res => res.json());             
    }
      getVideoChannels() {
       return this.http.get(`${this.vimeourl}users/brightonvineyard/channels?access_token=${this.vimeotoken}`)
            .toPromise()
            .then(res => res.json());                  
    }
      getVideosByCategory(categoryId:number) {
       return this.http.get(`${this.baseurl}posts/?categories=${categoryId}`)
            .toPromise()
            .then(res => res.json());            
    }
}
