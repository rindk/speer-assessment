import ActivitiesOutlet from './containers/ActivitiesOutlet';
import ActivityFeed from './containers/ActivityFeed';
import ActivityDetail from './containers/ActivityDetail';

const activitiesRoutes = [
  {
    path: '/activity',
    element: ActivitiesOutlet,
    children: [
      {
        path: '',
        element: ActivityFeed,
      },
      {
        path: ':id',
        element: ActivityDetail,
      },
    ],
  },
];

export default activitiesRoutes;
