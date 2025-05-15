export const NavItems = [
  {
    label: 'Covoiturage',
    root: true,
    items: [
      {
        label: 'Rechercher',
        routerLink: ['carpooling', 'search']
      },
      {
        label: 'Mes réservations',
        routerLink: ['carpooling', 'booking-list']
      },
      {
        label: 'Mes annonces',
        routerLink: ['carpooling']
      },
    ],
  },
  {
    label: 'Véhicules de service',
    items: [
      {
        label: 'Rechercher',
      }, {
        label: 'Mes réservations',
      },
      {
        separator: true
      },
      {
        label: 'Liste des véhicule',
        routerLink: ['service-vehicle', 'list']
      },
    ],
  },
];
