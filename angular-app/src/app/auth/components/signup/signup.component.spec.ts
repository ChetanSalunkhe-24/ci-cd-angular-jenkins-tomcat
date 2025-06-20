import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['signup']);

    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.signupForm.get('email')?.value).toBe('');
    expect(component.signupForm.get('password')?.value).toBe('');
    expect(component.signupForm.get('confirmPassword')?.value).toBe('');
  });

  it('should validate matching passwords', () => {
    component.signupForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'different'
    });
    
    expect(component.signupForm.errors?.['mismatch']).toBeTruthy();
    
    component.signupForm.patchValue({
      confirmPassword: 'password123'
    });
    
    expect(component.signupForm.errors).toBeNull();
  });

  it('should call auth service on valid form submission', () => {
    const testCredentials = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    };
    
    component.signupForm.setValue(testCredentials);
    component.onSubmit();
    
    expect(authService.signup).toHaveBeenCalledWith(testCredentials);
  });

  it('should not call auth service on invalid form', () => {
    component.signupForm.patchValue({
      email: 'invalid-email',
      password: '12345', // too short
      confirmPassword: 'different'
    });
    
    component.onSubmit();
    
    expect(authService.signup).not.toHaveBeenCalled();
  });
});