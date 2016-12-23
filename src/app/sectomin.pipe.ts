import{ Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name:'SecToMin'})

export class SecToMinPipe implements PipeTransform{
    transform(value: number){
        let formatedString:string;
        let tempTime: any;
        let showHours: string = '';
         tempTime = moment.duration(value, 'seconds');
        if(tempTime.hours()>0){
            showHours = tempTime.hours().toString() + ':';
        }
        formatedString = showHours + tempTime.minutes().toString() +':' + tempTime.seconds().toString();
        return formatedString;         
    }

}