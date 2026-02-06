import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';
import {useCallback, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {v4 as uuid} from 'uuid';
import * as yup from 'yup';
import {ActivityType} from '../../../db/models/Activity/ActivityModel';
import ActivityService from '../../../db/models/Activity/ActivityService';
import {RootStackParamList} from '../../../navigation/types';

/**
 * Form state and handlers for adding an activity. Validates and persists via ActivityService,
 * then navigates back. startDate is watched so endDate's minimumDate can be set in the UI.
 */
const useActivityForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // create schema for form validation and rules
  const schema = useMemo(
    () =>
      yup
        .object({
          id: yup.string().required(),
          title: yup.string().required('Title is required'),
          startDate: yup
            .date()
            .required('Start date is required')
            .max(moment().toDate(), 'Start date cannot be in the future'),
          endDate: yup
            .date()
            .required('End date is required')
            .min(yup.ref('startDate'), 'End date must be after start date'),
        })
        .required(),
    [],
  );

  const {control, handleSubmit, watch} = useForm<ActivityType>({
    resolver: yupResolver(schema),
    defaultValues: {id: uuid()},
  });

  // watch startDate to set minimumDate for endDate picker
  // endDate cannot be before startDate
  const startDate = watch('startDate');

  const handleAddActivity = useCallback(() => {
    handleSubmit(
      (data: ActivityType) => {
        ActivityService.createActivity(data);
        navigation.goBack();
      },
      error => {},
    )();
  }, [handleSubmit, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    handleAddActivity,
    handleCancel,
    control,
    startDate,
  };
};

export default useActivityForm;
