import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { DomSanitizerUrlPipe } from './dom-sanitizer-url.pipe';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  declarations: [
    DomSanitizerPipe,
    DomSanitizerUrlPipe,
    ImagenPipe
  ],
  exports: [
    DomSanitizerPipe,
    DomSanitizerUrlPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
