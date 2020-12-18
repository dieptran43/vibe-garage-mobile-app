import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  spotlightContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  spotlightContent: {
    marginBottom: 50,
    padding: 16,
  },
  scrollViewContent: {
    height: '100%',
  },
  noneFoundWrapper: {
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotlightHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.11)',
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center',
    marginBottom: 30,
  },
  spotlightImage: {height: 60, width: 100, resizeMode: 'contain'},
  spotlightText: {color: '#fff', fontSize: 20},
  singleSpotlightWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.11)',
  },
  spotlightRowOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotlightRowTwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222225'
  },
});

export default styles;
