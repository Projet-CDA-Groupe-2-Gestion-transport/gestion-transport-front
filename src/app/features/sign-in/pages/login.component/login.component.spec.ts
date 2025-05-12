import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {AuthResponse} from '../../../../core/model/auth-response.model';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {provide: AuthenticationService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('username')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });

  it('should mark username as invalid if empty', () => {
    component.form.get('username')?.setValue('');
    expect(component.form.get('username')?.valid).toBeFalse();
  });

  it('should mark password as invalid if empty', () => {
    component.form.get('password')?.setValue('');
    expect(component.form.get('password')?.valid).toBeFalse();
  });

  it('should call login and navigate on submit success', () => {
    mockAuthService.login.and.returnValue(of({} as AuthResponse));

    component.form.setValue({
      username: 'test@example.com',
      password: 'password123'
    });

    component.submit();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should handle login error', () => {
    mockAuthService.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

    const formdata = {
      username: 'wrong@example.com',
      password: 'wrongpassword'
    };

    component.form.setValue(formdata);

    component.submit();

    expect(mockAuthService.login).toHaveBeenCalledWith(formdata.username, formdata.password);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should disable submit button when form is invalid', () => {
    component.form.setValue({username: '', password: ''});
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('p-button'));
    expect(button.componentInstance.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.form.setValue({username: 'test@example.com', password: 'password123'});
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('p-button'));
    expect(button.componentInstance.disabled).toBeFalse();
  });
});
