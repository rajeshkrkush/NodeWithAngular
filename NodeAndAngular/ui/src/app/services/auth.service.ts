import { Injectable } from '@angular/core';
import { SendreceiveService } from './sendreceive.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  constructor(private router: Router, public sendReceiveService: SendreceiveService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['signin']);
    return false;
  }
  authenticate(username: string, password: string) {
    const inputData = {
      modelId: '101',
      username: username,
      password: password
    };
    return this.sendReceiveService.send(inputData);
  }
}
