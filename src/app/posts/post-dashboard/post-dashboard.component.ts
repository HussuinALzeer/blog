import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  foods = ['drama', 'horro', 'Classics', 'Comic Book or Graphic Novel'
    , 'Detective ', 'Mystery', 'Fantasy'];
  imgSrc = 'select.jpg';
  selectedImage: any = null;
  submitted: boolean = false;
  createform: FormGroup;
  time: number = 5;
  path: string;


  file: any = {};
  downloadUrl: Observable<any>;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: string;
  
  
  catagoryform: FormGroup;
  check: boolean = false;
  theClass = 'wall';
  image: string = null;

  constructor(private postService: PostService, private AuthService: AuthService,
    private fb: FormBuilder, private snackBar: MatSnackBar, private rout: Router,
    private storage: AngularFireStorage
  ) { }

  
  ngOnInit(): void {


    this.createform = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      published: ['', Validators.required],
      content: ['', Validators.required],
      image:this.image,
      categories: ['', Validators.required],
      pages:['',Validators.required]
    })

    this.catagoryform = this.fb.group({
      AddCatagory: ['', Validators.required],
    })
  }

  

  onsubmit(message, action) {
    this.submitted = true;

    if (this.createform) {
      this.postService.createPost(this.createform.value);
      let snakeBar = this.snackBar.open(message, action, { duration: 3000 });
      
      snakeBar.afterDismissed().subscribe(() => {
        this.rout.navigate(['']);
      });

    }
  }

  catagorySubmit() {
    if (this.catagoryform.valid) {
      this.postService.createCatagories(this.catagoryform.value);
      this.catagoryform.reset();
    }
  }


  show() {
    this.check = !this.check;
    if (this.check == false) {
      this.theClass='wall'
    } else {
      this.theClass='wall2'
    }

    
  }


  // this website to how to upload the photo 
//https://ankitmaheshwariin.medium.com/how-to-upload-and-display-image-file-in-pwa-angular-project-using-firebase-cloud-storage-and-95763bc83da7

  async uploadImage($event: any) {
    this.file = $event.target.files[0];
    
    var split = $event.split('fakepath\\');

    this.ref = this.storage.ref(`${this.file.name}`);
    this.image = split[1];
    // the line will send the the photo to the storage
    this.task = this.ref.put($event.target.files[0]);

   this.uploadProgress = this.task.snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
  
     this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = this.ref.getDownloadURL())
    )
    .subscribe();

    if (this.file.type.split('/')[0] !== 'image') {
      return alert('only images file')
    } else {
      
    }

    // to show the photo that i picke
    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL($event.target.files[0]);
      this.selectedImage = $event.target.files[0];
      this.path = $event.target.files[0];
    }
    else {
      this.imgSrc = 'select.jpg';
      this.selectedImage = null;
    }

  }

 

  restForm() {
    this.createform.reset();
    this.createform.setValue({
       
    }) 
    this.imgSrc = 'select.jpg';
    this.submitted = false;
    this.selectedImage = null;
  }


 
  
}
