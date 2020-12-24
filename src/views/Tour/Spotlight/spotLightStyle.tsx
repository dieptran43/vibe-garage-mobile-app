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
    marginBottom: 10,
  },
  spotlightImage: {height: 40, width: 80, resizeMode: 'contain'},
  spotlightText: {color: '#fff', fontSize: 20},
  singleSpotlightWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.11)',
    paddingVertical: 20,
  },
  spotlightRowOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  spotlightRowTwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222225',
    padding: 16,
    borderRadius: 3,
  },
  artistImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  artistName: {
    marginBottom: 10,
  },
  artistInfo: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  moreIcon: {
    marginLeft: 'auto',
  },
  albumImage: {
    height: 55,
    width: 55,
    marginRight: 15
  },
});

export default styles;
