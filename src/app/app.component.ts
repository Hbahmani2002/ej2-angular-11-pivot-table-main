import { Component } from '@angular/core';
import { FetchService } from './fetch.service';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a class="navbar-brand" routerLink="">YBBYS</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
         
          <div class="form-inline">
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              type="button"
              *ngIf="authService.user$ | async as user"
              (click)="logout()"
            >
              Exit
            </button>
          </div>
        </div>
      </nav>
    </header>
    <main class="d-flex flex-column flex-grow-1 h-100 w-100">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  showSpinner = false;
  constructor(public authService: FetchService) {
   
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
