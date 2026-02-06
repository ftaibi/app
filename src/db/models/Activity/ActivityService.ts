import realmDB from '../../realmDB';
import ActivityModel, {ActivityType} from './ActivityModel';
import moment from 'moment';

const ActivityService = {
  createActivity: (activity: ActivityType) => {
    /**
     * duration is stored in minutes for easy aggregation;
     *  it can be derived from startDate/endDate but we persist it so
     * realm can sum/min/max it directly (e.g. total time) without reading every
     * object and computing in JS, faster and simpler for large lists.
     */
    const duration = moment(activity.endDate).diff(
      moment(activity.startDate),
      'minutes',
    );
    realmDB.write(() => {
      realmDB.create(ActivityModel.schema.name, {
        ...activity,
        duration,
      });
    });
  },

  getActivityById: (id: string) => {
    return realmDB.objectForPrimaryKey(ActivityModel.schema.name, id);
  },
  // Deletes by primary key
  deleteActivity: (id: string) => {
    const activity = realmDB.objectForPrimaryKey(ActivityModel.schema.name, id);
    if (activity) {
      realmDB.write(() => {
        realmDB.delete(activity);
      });
    }
  },
};

export default ActivityService;
