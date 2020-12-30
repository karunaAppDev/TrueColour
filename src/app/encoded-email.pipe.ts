import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodedEmail'
})
export class EncodedEmailPipe implements PipeTransform {

  transform(value: String): String {
    var updatedemail: any;
    var encodedPart= value.substr(0,3); 
    var str="*";
    var codeValue=str.repeat(3);
    updatedemail= value.replace(encodedPart,codeValue);
    return updatedemail;
  }

}
