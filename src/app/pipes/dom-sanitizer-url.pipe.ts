import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizerUrl'
})
export class DomSanitizerUrlPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) {}

  transform( img: string): any {
    return this.domSanitizer.bypassSecurityTrustUrl( img );
  }

}
