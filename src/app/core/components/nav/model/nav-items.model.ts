export const NavItems = [
  {
    label: 'Covoiturage',
    root: true,
    items: [
      {
        label: 'Rechercher',
      },
      {
        label: 'Mes réservations',
      },
      {
        label: 'Mes annonces',
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
