import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle login', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    spyOn(console, 'log');
    
    service.login(credentials);
    expect(console.log).toHaveBeenCalledWith('Login attempt:', credentials);
  });

  it('should handle signup', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    spyOn(console, 'log');
    
    service.signup(credentials);
    expect(console.log).toHaveBeenCalledWith('Signup attempt:', credentials);
  });
});