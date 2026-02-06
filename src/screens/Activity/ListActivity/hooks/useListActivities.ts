import {useQuery} from '@realm/react';
import {useMemo} from 'react';
import ActivityModel from '../../../../db/models/Activity/ActivityModel';
import moment from 'moment';

export type ActivitySection = {key: string; data: ActivityModel[]};

const DAY_LABEL_FORMAT = 'ddd, DD MMM';

/**
 * Supplies the list screen with activities grouped by day (newest first) and total duration.
 * useQuery is reactive: when Realm data changes, the hook re-runs and returns updated values.
 */
const useListActivities = () => {
  const activities = useQuery(ActivityModel).sorted('startDate', true);

  const {totalDurationHours, totalDurationMins} = useMemo(() => {
    const totalMinutes = activities.sum('duration') ?? 0;
    const duration = moment.duration(totalMinutes, 'minutes');
    return {
      totalDurationHours: duration.hours(),
      totalDurationMins: duration.minutes(),
    };
  }, [activities]);

  const sections = useMemo((): ActivitySection[] => {
    const byDay: Record<string, ActivityModel[]> = {};
    // group activities by day
    for (const activity of activities) {
      const day = moment(activity.startDate).format(DAY_LABEL_FORMAT);
      if (!byDay[day]) byDay[day] = [];
      byDay[day].push(activity);
    }
    // activities are sorted startDate desc, so insertion order = newest day first
    return Object.entries(byDay).map(([key, data]) => ({key, data}));
  }, [activities]);

  return {
    sections,
    totalDurationHours,
    totalDurationMins,
  };
};

export default useListActivities;
