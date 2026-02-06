import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import {memo, useCallback, useMemo} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ActivityService from '../../db/models/Activity/ActivityService';
import {ActivityType} from '../../db/models/Activity/ActivityModel';

const ActivityItem = ({item}: {item: ActivityType}) => {
  const handleDelete = useCallback(() => {
    if (!item.id) {
      console.error('Activity ID is required');
      return;
    }
    Alert.alert(
      'Delete Activity',
      'Are you sure you want to delete this activity?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => ActivityService.deleteActivity(item.id!),
          style: 'destructive',
        },
      ],
    );
  }, [item.id]);

  // if duration is not set, calculate it from start and end dates
  const durationMins = useMemo(
    () =>
      item.duration ??
      moment(item.endDate).diff(moment(item.startDate), 'minutes'),
    [item.duration, item.endDate, item.startDate],
  );

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.timeRange}>
          {`${moment(item.startDate).format('LT')} – ${moment(item.endDate).format('LT')}`}
        </Text>
        <Text style={styles.duration}>{`${durationMins} min`}</Text>
      </View>

      <TouchableOpacity
        onPress={handleDelete}
        hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>
        <Ionicons name="trash-outline" size={20} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(ActivityItem);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#666',
  },
  timeRange: {
    fontSize: 12,
    color: '#666',
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
});
