import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  Auth$: Observable<boolean>;

  constructor(private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.Auth$=this.store.select(fromRoot.getAuth)
    console.log(this.Auth$)
  }

}
