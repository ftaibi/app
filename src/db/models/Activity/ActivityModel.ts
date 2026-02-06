import Realm from 'realm';

class ActivityModel extends Realm.Object<ActivityModel> {
  id!: string;
  title!: string;
  startDate!: Date;
  endDate!: Date;
  note?: string;
  duration?: number;

  static schema: Realm.ObjectSchema = {
    name: 'Activity',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      note: 'string?',
      startDate: 'date',
      endDate: 'date',
      duration: 'int?',
    },
  };
}

export default ActivityModel;

// infer the type of the activity model from the schema
export type ActivityType = Omit<ActivityModel, keyof Realm.Object>;
