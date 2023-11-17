import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchService } from '../fetch.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    @ViewChild('userInput', { static: false }) userInput: ElementRef;
    @ViewChild('passInput', { static: false }) passInput: ElementRef;
    
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: FetchService,
     
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.user$) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
     
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

     
      const inputValue0 = this.userInput.nativeElement.value;
      const inputValue1 = this.passInput.nativeElement.value;
      this.loading = true;
      this.authenticationService.login(inputValue0, inputValue1)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  
                  this.loading = false;
              });
  }
}
