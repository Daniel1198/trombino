import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { changeSearchValue } from '../store/action';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.scss']
})
export class PagePrincipaleComponent implements OnInit {

  isFastSearch: boolean = true;
  isFadeOut: boolean = false;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    if (window.location.pathname !== '/rechercherapide')
      this.isFastSearch = false;
  }

  onChangePage(isFastSearch: boolean) {
    this.isFadeOut = !isFastSearch;
    if (this.isFastSearch) {
      setTimeout(() => this.isFastSearch = isFastSearch, 800)
    }
    else {
      this.isFastSearch = isFastSearch;
      this.isFadeOut = false;
      this.store.dispatch(changeSearchValue({ search: '' }));
    }
  }

  onSearch(search: string) {
    this.store.dispatch(changeSearchValue({ search: search }));
  }
}
