import ActivitiesOutlet from './containers/ActivitiesOutlet';
import ActivityFeed from './components/ActivityFeed';
import ActivityDetail from './components/ActivityDetail';

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
