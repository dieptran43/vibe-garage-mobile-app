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
    height: 500,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSongsContent: {display: 'flex'},
  noneFoundText: {color: '#cecece'},
  spotlightHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  spotlightImage: {height: 40, width: 80, resizeMode: 'contain'},
  spotlightText: {color: '#fff', fontSize: 20},
  singleSpotlightWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
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
    fontSize: 13,
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
    marginRight: 15,
  },
  albumName: {
    width: '60%',
  },
  songDuration: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  historyIcon: {fontSize: 12, marginLeft: 5},
  moreWrapper: {
    position: 'relative',
  },
  moreBtnsWrapper: {
    position: 'absolute',
    top: 25,
    left: -102,
    backgroundColor: '#2f2f2f',
    borderRadius: 5,
    width: 125,
    zIndex: 10,
    paddingLeft: 15,
    // paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  moreBtn: {
    paddingVertical: 12,
  },
});

export default styles;
