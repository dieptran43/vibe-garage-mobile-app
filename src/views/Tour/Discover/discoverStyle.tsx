import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  discoverContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  discoverContent: {
    marginBottom: 50,
  },
  scrollViewContent: {
    height: '100%',
  },
  carouselContainer: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 250,
    margin: 16,
    position: 'relative',
  },
  carouselImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  carouselText: {
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0, 0.4)',
  },
  carouselContent: {
    // marginBottom: 60,
  },
  contentWrapper: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  contentRow: {
    marginBottom: 60,
  },
  rowTag: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  showAllText: {
    fontSize: 12,
    marginRight: 10,
  },
  playlistsText: {color: '#cecece', fontSize: 16, marginLeft: 10},
  graphBg: {
    borderRadius: 50,
    height: 35,
    width: 35,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenBg: {
    backgroundColor: '#4caf50',
  },
  blueBg: {
    backgroundColor: '#2196F3',
  },
  pinkBg: {
    backgroundColor: '#9c27b0',
  },
  maroonBg: {
    backgroundColor: '#00bcd4',
  },
  playlistsItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  arrowWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 50,
    height: 32,
    width: 32,
  },
  marginRight: {
    marginRight: 10,
  },
  singleCard: {
    // width: '50%',
    // marginRight: 20
  },
  cardImage: {
    height: 180,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
  },
  cardText2: {},
  topSongsContent: {display: 'flex'},
  noneFoundWrapper: {
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noneFoundText: {color: '#cecece'},
  topSongsWrapper: {
    marginTop: 20,
  },
  singleTopSong: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
  },
  topMusicImage: {height: 40, width: 40, marginRight: 15, borderRadius: 3},
  musicTextWrapper: {
    width: '70%',
  },
  musicTitleText: {color: '#c3c3c6', fontSize: 15},
  musicArtisteText: {color: '#8d8d8d', fontSize: 13},
  musicMoreIcon: {marginLeft: 'auto'},
  topAlbumsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  moreWrapper: {
    position: 'relative',
  },
  moreBtnsWrapper: {
    position: 'absolute',
    top: 25,
    left: -102,
    backgroundColor: '#222222',
    borderRadius: 5,
    width: 125,
    zIndex: 2,
    paddingLeft: 15,
    // paddingVertical: 5,
  },
  moreBtn: {
    paddingVertical: 10
  },
});

export default styles;
