import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodedPhoneNumber'
})
export class EncodedPhoneNumberPipe implements PipeTransform {

  
  transform(value: String): String {
    var updatedPhoneNo: any;
    
    var encodedPartSize= (value.length)-5;
    var encodedPart= value.substr(encodedPartSize,5);
    var str="*";
    var codeValue=str.repeat(encodedPartSize);
    updatedPhoneNo= value.replace(encodedPart,codeValue);
    return updatedPhoneNo;
  }

}

