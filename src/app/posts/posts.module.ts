import { NgModule } from '@angular/core';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from '../posts/post.service';
import { SharedModule } from '../shared/shared.module';
import { Routes,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailsComponent },
  { path: 'dashboard', component:PostDashboardComponent }
]

@NgModule({
  declarations: [
    PostDashboardComponent,
    PostDetailsComponent,
    PostListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [PostService]
})
export class PostsModule { }
