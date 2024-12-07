import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router){}

  isAuthenticated(): boolean{
    return !!localStorage.getItem('authToken');
  }
  navigateToProfile(): void{
    if(this.isAuthenticated()){
      this.router.navigate(['/profile']);
    } else{
      this.router.navigate(['/login'])
    }
  }
  navigateToBasket(): void{
    if(this.isAuthenticated()){
      this.router.navigate(['/basket']);
    } else{
      this.router.navigate(['/login'])
    }
  }
}
