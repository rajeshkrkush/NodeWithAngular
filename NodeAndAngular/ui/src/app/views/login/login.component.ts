import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePage: boolean = false;
  show: boolean = false;
  public signinData: {
    username: string,
    password: string
  } = {
      username: '',
      password: ''
    };

  public signinForm: FormGroup;
  public validation_messages = {
    'username': [
      { type: 'required', message: 'username required' }

    ],
    'password': [
      { type: 'required', message: 'password required' }

    ]
  };
  constructor(private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  login() {
    if (this.signinForm.valid) {
      this.signinData.username = this.signinData.username.toLowerCase();
      //authentication
      this.authService.authenticate(this.signinData.username, this.signinData.password).subscribe(loginResp => {
        //validating username and password with server response
        if (loginResp.Data.responseCode == 0) {
          this.router.navigate(['dashboard']);
        }
        if (loginResp.Data.responseCode == 91) {
          this.snackbar.openSnackBar("please signup", "Okay");
        }
      });
    }

  }

  showSignUpPage() {
    console.log("called showSignUpPage");
    this.router.navigate(['signup']);
  }

}
