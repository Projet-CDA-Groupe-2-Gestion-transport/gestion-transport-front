import {AuthenticationService} from '../../../services/authentication.service';

export function createSubNavItems(authService: AuthenticationService) {
  return [
    {
      label: 'Nom Prénom',
      items: [
        {
          label: 'Se déconnecter',
          command: () => {
            authService.logout();
          }
        }
      ]
    }
  ];
}
