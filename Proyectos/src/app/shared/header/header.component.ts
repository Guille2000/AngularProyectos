import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private tokenService:TokenService,
    private router:Router){

  }
  logout(){
    this.tokenService.logout()
    this.router.navigate(['/'])

  }
}
