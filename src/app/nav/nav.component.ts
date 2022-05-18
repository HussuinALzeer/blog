import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  check: boolean = false;
  className='navi2'
  constructor(public auth: AuthService, private store: Store<fromRoot.State>,
    private store2: Store<fromRoot.State>) { }
  Auth$: Observable<boolean>;

  ngOnInit(): void {
    this.Auth$ = this.store.select(fromRoot.getAuth);
  }

  logout() {
    this.auth.logout();
    this.change();
  }

  change() {
    this.check = !(this.check);

    if (this.check == true) {
      this.className='navi'
    } else {
      this.className='navi2'
    }

    console.log(this.check);
   

  }
}
