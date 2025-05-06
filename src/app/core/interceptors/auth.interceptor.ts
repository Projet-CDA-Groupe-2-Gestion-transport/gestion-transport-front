import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';
import {inject} from '@angular/core';
import {AuthenticationService} from '../services/AuthenticationService';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  const messageService = inject(MessageService);
  const authService = inject(AuthenticationService);

  const handleError = (error: any) => {
    let message = error?.error;
    if (error.status == 401) {
      message = 'Accès interdit';
      authService.logout();
    }
    messageService.add({severity: 'error', summary: 'Erreur', detail: message, icon: 'fa-solid fa-xmark'});
    return throwError(() => new Error(message));
  };


  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned).pipe(catchError(handleError));
  }
  return next(req).pipe(catchError(handleError));
};


