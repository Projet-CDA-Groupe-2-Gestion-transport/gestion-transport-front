import {AuthenticationService} from '../../../services/authentication.service';

export function createSubNavItems(authService: AuthenticationService) {
  return [
    {
      label: authService.getFirstName() + ' ' + authService.getLastName(),
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
