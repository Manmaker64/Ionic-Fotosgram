import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public posts: Post[];
  public habilitado: boolean;

  constructor( private postsService: PostsService ) {
    this.posts = [];
    this.habilitado = true;
  }

  ngOnInit() {
    this.siguientes();
    this.postsService.nuevoPost
        .subscribe( (post: Post) => {
          this.posts.unshift( post );
        });
  }

  recargar( evento: any ) {
    this.siguientes( evento, true );
    this.habilitado = true;
    this.posts = [];
  }

  siguientes( evento?: any, pull: boolean = false ) {
    this.postsService.getPosts( pull )
        .subscribe( resp => {
          this.posts.push( ...resp.posts );
          if ( evento ) {
            evento.target.complete();
            if ( resp.posts.length === 0 ) {
              this.habilitado = false;
            }
          }
        });
  }
}
