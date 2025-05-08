import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {catchError, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {MessagesModule} from 'primeng/messages';
import {emailValidator} from '../../../../core/validators/email.validator';
import {FormErrorComponent} from '../../../../core/components/form-error-component/form-error.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    ToastModule,
    InputGroup,
    InputGroupAddon,
    InputText,
    Button,
    MessagesModule,
    FormErrorComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  private initForm() {
    this.form = this.fb.group(
      {
        username: [null, [Validators.required, emailValidator()]],
        password: [null, Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.initForm();
  }


  submit() {
    this.authService.login(this.form.getRawValue().username, this.form.getRawValue().password).pipe(
      tap(() => this.router.navigate(['home'])),
      catchError(err => {
        return of(err);
      })
    ).subscribe();


  }
}
