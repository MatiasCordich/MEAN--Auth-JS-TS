import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor( private authService: AuthService, private fb: FormBuilder, private router: Router){}

  register() {
    
    const {name,  email, password } = this.miFormulario.value
    
    this.authService.register(name, email, password)
      .subscribe(status => {
        if(status === true) {
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire('Error', status, 'error')
        }
      })
  }

}
