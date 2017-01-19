import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HomeService {
  private  baseurl: string = 'http://www.brightonvineyard.com/wp-json/wp/v2/';
  private  vimeourl: string = 'https://api.vimeo.com/';
  private vimeotoken: string = '3060da4d95d5aecaf208fef91db3460c';
  storage: any;
    constructor(private http:Http, storage: Storage){
            this.storage = storage;
    }
    getChurchEvents() {
       // let churchEventsArray: any;
        let url = `${this.baseurl}posts/?filter[category_name]=events`;
        let request = this.http.get(url)
        .map(res => res.json())
        .mergeMap(res => this.storage.set('churchEvents', res));
       return request;
    }
    getLatestPosts() {
        let url = `${this.vimeourl}channels/brightonvineyard/videos?access_token=${this.vimeotoken}`
        let request = this.http.get(url).map(this.extractData)
         .mergeMap(res => this.storage.set('latestPosts', res))
         return request;       
    }
    getVideoAlbums() {
        return this.http.get(`${this.vimeourl}users/brightonvineyard/albums?access_token=${this.vimeotoken}&sort=date&direction=desc`)
         .map(this.extractData)
         .mergeMap(res => this.storage.set('videoAlbums', res));           
    }
      getVideoChannels() {
       return this.http.get(`${this.vimeourl}users/brightonvineyard/channels?access_token=${this.vimeotoken}&sort=date&direction=asc`)
         .map(this.extractData)
         .mergeMap(res => this.storage.set('videoChannels', res));                 
    }
      getVideosByCategory(categoryUri:string) {
       return this.http.get(`${this.vimeourl}${categoryUri}/videos?access_token=${this.vimeotoken}&page=1`)                
            .toPromise()
            .then(res => {this.storage.set('videosByCategory', res.json());
            return res.json(); 
                    });            
    }
      getMoreVideos(nextURI:string) {
       return this.http.get(`${this.vimeourl}/channels${nextURI}`)
            .toPromise()
            .then(res => res.json());            
    }
    getPage(pageId:number) {
       return this.http.get(`${this.baseurl}pages/${pageId}`)
        .map(this.convertPage)
        .mergeMap(res => this.storage.set('page', res));       
    }
    getPagesByParent(parentId:number) {
       return this.http.get(`${this.baseurl}pages/?filter[orderby]=menu_order&order=asc&parent=${parentId}`)
         .map(res => res.json())
         .mergeMap(res => this.storage.set('pages', res));   
    }
    getCategory(categoryId:number) {
       return this.http.get(`${this.baseurl}categories/${categoryId}`)
         .map(res => res.json())
         .mergeMap(res => this.storage.set('newsCategory', res));               
    }
     getPostsByCategory(categoryName:string) {
       return this.http.get(`${this.baseurl}posts/?filter[category_name]=${categoryName}`)
         .map(res => res.json())
         .mergeMap(res => this.storage.set('postsByCategory', res));         
    }
     private convertPage(res: Response) {
             let body = res.json();
             var arrObj = [];
             Object.keys(body.acf).forEach(function (key, index) {
                     arrObj.push(body.acf[key]);
             });
             return arrObj;
     }
    private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
}

