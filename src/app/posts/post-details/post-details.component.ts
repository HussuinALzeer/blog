import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as fromNav from '../../store/action/nav.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  foods = ['drama', 'horro', 'Classics', 'Comic Book or Graphic Novel'
    , 'Detective ', 'Mystery', 'Fantasy'];
  
  post: Post;
  editing: boolean = false;
  Auth$: Observable<boolean>;

  constructor(private ActivateRout:ActivatedRoute,private Postservice:PostService,
    private router:Router,private auth:AuthService,private store:Store<fromRoot.State>
    ) { }

  ngOnInit(): void {
    this.getPost()

    if (localStorage.getItem('user') == null) {
      this.store.dispatch(new fromNav.AuthFailAction())
    }
    else {
      this.store.dispatch(new fromNav.AuthSuccessAction)
    }

    this.Auth$ = this.store.select(fromRoot.getAuth);
  }

  getPost() {
    // what i will use here it to bring the id from   {blog/posts.id} in the app-router and from post-list
    const id = this.ActivateRout.snapshot.paramMap.get('id');

    this.Postservice.getThePost(id).subscribe(data => {
      this.post = data
    })
  }

  delete() {
    const id = this.ActivateRout.snapshot.paramMap.get('id');
    this.Postservice.deletee(id);
    this.router.navigate(['/blog'])
  }

  edit() {
    this.editing = true;
    console.log(this.editing)
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      pages: this.post.pages,
      categories: this.post.categories,
      author: this.post.author,
      published:this.post.published,
    }
    const id = this.ActivateRout.snapshot.paramMap.get('id');

    this.Postservice.update(id, formData);
    this.editing=false
  }

}
