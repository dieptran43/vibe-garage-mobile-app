import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  latestMusicContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  latestMusicContent: {
    marginBottom: 50,
    padding: 16,
  },
  scrollViewContent: {
    height: '100%',
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
  blueBg: {
    backgroundColor: '#2196F3',
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
    height: 150,
  },
  musicTitleText: {color: '#c3c3c6', fontSize: 15},
  musicArtisteText: {color: '#8d8d8d', fontSize: 13},
  musicMoreIcon: {marginLeft: 'auto'},
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
});

export default styles;
