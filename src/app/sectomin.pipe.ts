import{ Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name:'SecToMin'})

export class SecToMinPipe implements PipeTransform{
    transform(value: number){
        let formatedString:string;
        let tempTime: any;
        let showHours: string = '';
        let showSeconds:  string = '';
         tempTime = moment.duration(value, 'seconds');
        if(tempTime.hours()>0){
            showHours = tempTime.hours().toString() + ':';
        }
        if(tempTime.seconds() < 10){
            showSeconds = '0' + tempTime.seconds().toString();
        }else{
            showSeconds = tempTime.seconds().toString()
        }
        formatedString = showHours + tempTime.minutes().toString() +':' + showSeconds;
        return formatedString;         
    }

}