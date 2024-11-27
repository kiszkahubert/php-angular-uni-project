import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  onSubmit(){

  }
  // constructor(private authService: authService, private router: Router){}
  
  // onSubmit(){
  //   this.authService.login(this.username,this.password).subscribe(
  //     success =>{
  //       if(success){
  //         this.router.navigate(['/dashboard']);
  //       } else{
  //         this.loginError = true;
  //       }
  //     },
  //     error => {
  //       this.loginError = true;
  //     }
  //   )
  // }
}
