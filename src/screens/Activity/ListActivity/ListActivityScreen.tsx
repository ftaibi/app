import {useTheme} from '@react-navigation/native';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ActivityItem from '../../../components/ActivityItem/ActivityItem';
import EmptyList from '../../../components/EmptyList/EmptyList';
import FAB from '../../../components/FAB/FAB';
import useListActivities from './hooks/useListActivities';

const ListActivityScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {sections, totalDurationHours, totalDurationMins} = useListActivities();

  const {
    colors: {background},
  } = useTheme();
  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={({item}) => <ActivityItem item={item} />}
        renderSectionHeader={({section: {key}}) => (
          <Text style={[styles.sectionHeader, {backgroundColor: background}]}>
            {key}
          </Text>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: bottom},
        ]}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      <Text style={styles.footer}>
        Total duration: {totalDurationHours}h {totalDurationMins}m
      </Text>
      <FAB />
    </View>
  );
};

export default ListActivityScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    marginHorizontal: 10,
    flexGrow: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 8,
  },
  itemSeparator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footer: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});
