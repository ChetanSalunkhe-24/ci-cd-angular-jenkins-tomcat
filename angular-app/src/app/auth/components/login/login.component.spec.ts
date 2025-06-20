import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate email format', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should validate password length', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('12345');
    expect(passwordControl?.errors?.['minlength']).toBeTruthy();
    
    passwordControl?.setValue('123456');
    expect(passwordControl?.errors).toBeNull();
  });

  it('should call auth service on valid form submission', () => {
    const testCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    component.loginForm.setValue(testCredentials);
    component.onSubmit();
    
    expect(authService.login).toHaveBeenCalledWith(testCredentials);
  });

  it('should navigate to signup page', () => {
    component.goToSignup();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/signup']);
  });
});