import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topMusicContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  topMusicContent: {
    marginBottom: 50,
    padding: 16,
  },
  topSongsHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 16,
    paddingTop: 20,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  showAllText: {color: '#808080', fontSize: 13},
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
  topSongsContent: {display: 'flex'},
  noneFoundText: {color: '#cecece'},
  topSongsWrapper: {
    marginTop: 30,
  },
  singleTopSong: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
  },
  seeAllTopSongsText: {
    backgroundColor: '#2c2c2f',
    color: '#CCAB52',
    alignSelf: 'flex-start',
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    marginTop: 50,
    marginBottom: 30,
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
  singleTopAlbum: {
    width: '47%',
    borderRadius: 3,
    marginBottom: 20,
  },
  topAlbumImage: {
    height: 100,
  },
});

export default styles;
