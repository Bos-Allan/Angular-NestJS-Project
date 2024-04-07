import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    
  }

  goToHome(){
    this.router.navigate(['home'])
  }

  goToFavoris(){
    //this.router.navigate(['favoris'])
    const navigationExtras: NavigationExtras = {state: {reload: true}};
    this.router.navigate(['favoris'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

}
