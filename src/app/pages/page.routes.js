import activitiesRoutes from './activities/activities.routes';
import Page  from './Page';

const pageRoutes = [
  {
    path: '/',
    element: Page,
    children: [...activitiesRoutes],
  },
];

export default pageRoutes;
