import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';
import {inject} from '@angular/core';
import {AuthenticationService} from '../services/AuthenticationService';
import {ToastService} from '../adapters/toast.service';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const authService = inject(AuthenticationService);
  const toastService = inject(ToastService);


  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {

        let message: string | null = null;

        if (typeof event.body === 'string') {
          message = event.body;
        }
        else if (event.body && typeof event.body === 'object' && 'message' in event.body) {
          message = event.body.message as string;
        }

        if (message && event.status >= 200 && event.status < 300) {
          messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: message,
            icon: 'fa-solid fa-check'
          });
        }
      }
      return event;
    }),
    catchError(error => {
      let severity = 'error';
      let summary = 'Erreur';
      let message = 'Une erreur est survenue';
      let icon = 'fa-solid fa-xmark';

      if (error.error) {
        if (typeof error.error === 'string') {
          message = error.error;
        }
        else if (typeof error.error === 'object' && error.error !== null) {
          if ('message' in error.error && typeof error.error.message === 'string') {
            message = error.error.message;
          }
        }
      }

      if (message === null) {

        switch (error.status) {
          case 400:
            summary = 'Requête incorrecte';
            break;
          case 401:
            summary = 'Non autorisé';
            message = 'Veuillez vous connecter pour accéder à cette ressource';
            authService.logout();
            break;
          case 403:
            summary = 'Accès interdit';
            message = 'Vous n\'avez pas les droits nécessaires';
            authService.logout();
            break;
          case 404:
            summary = 'Non trouvé';
            message = 'La ressource demandée n\'existe pas';
            break;
          case 422:
            summary = 'Données invalides';
            break;
          case 500:
            summary = 'Erreur serveur';
            message = 'Un problème est survenu sur le serveur';
            break;
        }
      }

      toastService.message(
        severity,
        summary,
        message,
        icon
      );

      return throwError(() => new Error(message));
    })
  );
};
