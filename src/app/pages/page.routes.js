import activitiesRoutes from './activities/activities.routes';
import Page from './Page';

const pageRoutes = [
  {
    path: '/',
    element: Page,
    children: [
      {
        path: '',
        redirect: '/activity',
      },
      ...activitiesRoutes,
    ],
  },
];

export default pageRoutes;
