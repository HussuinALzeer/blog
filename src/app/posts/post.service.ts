import { Injectable } from '@angular/core';
import { AngularFirestore ,AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { Post } from './post.model';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database'
import { getStorage, ref } from "firebase/storage";
import { FileUpload } from './post-dashboard/post.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

// import {getDocs} from '@angular/fire/firestore'
// import { Firestore } from '@angular/fire/firestore';
// import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  imageDetailList: AngularFireList<any>;
  
  PostDoc: AngularFirestoreDocument<Post>;
  postCollection: AngularFirestoreCollection<Post>;
  private basePath = '/uploads';

  constructor(public af: AngularFirestore ,private auth:AuthService ) { 

  }

  
  
  getpostList() {
    return this.af.collection('posts').snapshotChanges();
  }

  

  getThePost(id:any) {
    this.PostDoc = this.af.doc<Post>(`posts/${id}`)
    return this.PostDoc.valueChanges()
  }

 

  createPost(post:Post) {
    return new Promise<any>((resolve, reject) => {
      this.af.collection('posts')
        .add(post)
        .then(response => {  }
        ),error =>reject(error);
    })
  }

  createCatagories(categories: string) {
    return new Promise<any>((resolve, reject) => {
      this.af.collection('categories')
        .add(categories)
        .then(response => {  }
        ), error => reject(error);
    })
  }



  deletee(id: string) {
    this.af.doc<Post>(`posts/${id}`).delete()
  }

  update(id:string,formData) {
    this.af.doc<Post>(`posts/${id}`).update(formData);

  }



 
}
