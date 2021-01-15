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
    marginBottom: 20,
  },
  tabTextWrapper: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  activeTabTextWrapper: {
    borderBottomColor: '#00bcd4',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  activeTabText: {
    color: '#00bcd4',
  },
  singleSong: {
    backgroundColor: '#222225',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  sectionOne: {
    borderBottomWidth: 1,
    borderBottomColor: '#363636',
    flex: 1,
    paddingBottom: 15,
  },
  singleSongWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleSongAvatar: {
    height: 60,
    width: 60,
    marginRight: 20,
  },
  boughtTrackText: {
    marginLeft: 'auto',
    fontSize: 11,
    marginTop: 20,
  },
  purchaseWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  priceText: {
    marginRight: 15,
  },
  purchaseText: {
    color: '#fff',
    backgroundColor: '#00bcd4',
    borderRadius: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
  sectionTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#363636',
  },
  topMusicText: {color: '#cecece', fontSize: 18, marginLeft: 10},
  graphBg: {
    backgroundColor: '#CCAB52',
    borderRadius: 50,
    height: 35,
    width: 35,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphImage: {height: 20, width: 20},
});

export default styles;
