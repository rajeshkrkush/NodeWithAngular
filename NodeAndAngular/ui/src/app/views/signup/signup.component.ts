import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { SendreceiveService } from './../../services/sendreceive.service';
import { SnackbarService } from './../../services/snackbar.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hidePage: boolean = false;
  show: boolean = false;
  public signupData: {
    username: string,
    password: string,
    repassword: string
  } = {
      username: '',
      password: '',
      repassword: ''
    };

  public signupForm: FormGroup;
  public validation_messages = {
    'username': [
      { type: 'required', message: 'username required' }

    ],
    'password': [
      { type: 'required', message: 'password required' }

    ],
    'repassword': [
      { type: 'required', message: 'reentring password required' }

    ]
  };
  constructor(private sendService: SendreceiveService,
    private router: Router,
    private snackBar: SnackbarService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required])),
      repassword: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  login() {
    if (this.signupForm.valid) {
      this.signupData.username = this.signupData.username.toLowerCase();
      if (this.signupData.password === this.signupData.repassword) {


        const msgToSdend = {
          modelId: '100',
          username: this.signupData.username,
          password: this.signupData.password,
        }
        this.sendService.send(msgToSdend).subscribe(singUpResp => {
          if (singUpResp.Data.responseCode == 0) {
            this.router.navigate['dashboard'];
          } else {
            this.snackBar.openSnackBar("User already Exists,Please Login", "Okay");
          }
        });
      }
      else {
        this.snackBar.openSnackBar("Password must match", "Okay");
      }
    }

  }

}

