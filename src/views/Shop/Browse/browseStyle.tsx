import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  browseContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  browseContent: {
    padding: 16,
  },
  scrollViewContent: {
    height: '100%',
  },
  tabHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabText: {
    fontSize: 16,
    width: '25%',
  },
  activeTabText: {
    color: 'red',
    borderBottomColor: 'red',
    borderBottomWidth: 2
  },
});

export default styles;
