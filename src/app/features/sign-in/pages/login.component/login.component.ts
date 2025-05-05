import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../core/services/AuthenticationService';
import {catchError, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.form = this.fb.group(
      {
        username: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
        password: [null, Validators.required]
      }
    )
  }

  submit() {
    this.authService.login(this.form.getRawValue().username, this.form.getRawValue().password).pipe(
      tap(_ => this.router.navigate(['home'])),
      catchError(err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'})
        return of(err);
      })
    ).subscribe();


  }
}
