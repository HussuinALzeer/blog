import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as fromNav from '../../store/action/nav.actions';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FileUpload } from '../post-dashboard/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  Post!: Post[];

  Auth$: Observable<boolean>;
  


  constructor(public postService: PostService, private store: Store<fromRoot.State>,
    private storage:AngularFireStorage) {}

  
  
  ngOnInit() { 
        this.postService.getpostList().subscribe(res => {
          this.Post = res.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data() as {}
            } as Post
          })

        });
    
    if (localStorage.getItem('user') == null) {
      this.store.dispatch(new fromNav.AuthFailAction())

    }
    else {
      this.store.dispatch(new fromNav.AuthSuccessAction)
    }
    
    this.Auth$ = this.store.select(fromRoot.getAuth);
    console.log(this.Post);

  }
   
  delete(id:string) {
    this.postService.deletee(id);
  }

  

  

}

