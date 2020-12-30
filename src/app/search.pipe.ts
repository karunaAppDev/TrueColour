import { Pipe, PipeTransform } from '@angular/core';
import { MainService } from './main.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(public mainserv :MainService){}

  transform(value: string[], searchValue: string, citystat: string): string[] {
    if (searchValue == '' || searchValue == undefined) {
      return null;
    }
    var tempList = [];
    var citystate = [];
    var address;
    var result=[];
    var resultLength=true;

    for (let i = 0; i < value.length; i++) {
      if(value[i]["userDetailVerified"]){
      let searchName = value[i]["Firstname"] + " " + value[i]["LastName"];
      if (searchName.toLowerCase().includes(searchValue.toLowerCase())) {
        tempList.push(value[i]);
      }
    }
    }

    //Advance search
    if (!(citystat == null)) {
      for (let j = 0; j < tempList.length; j++) {
        address = tempList[j]["Address"].toLowerCase();
        if (address.includes(citystat.toLowerCase())) {
          citystate.push(tempList[j]);
        }
      }
      return citystate;
    }


      return tempList;
  

  }

}
