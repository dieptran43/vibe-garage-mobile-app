import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  recentlyPlayedContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  recentlyPlayedContent: {
    marginBottom: 50,
    padding: 16,
  },
  scrollViewContent: {
    height: '100%',
  },
  recentlyPlayedHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    paddingTop: 20,
  },
  divider: {
    borderTopColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentlyPlayedText: {color: '#cecece', fontSize: 18, marginLeft: 10},
  graphBg: {
    backgroundColor: '#4caf50',
    borderRadius: 50,
    height: 35,
    width: 35,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentlyPlayedItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  singleRecentlyPlayed: {
    borderWidth: 1,
    borderColor: 'rgba(151, 151, 151, 0.3)',
    borderRadius: 5,
    marginBottom: 20,
    width: '47%',
  },
  singleRecentlyPlayedRowOne: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  recentlyPlayedImage: {
    borderRadius: 50,
    height: 35,
    width: 35,
    marginRight: 10,
  },
  recentlyPlayedTitle1: {
    color: '#fff',
  },
  recentlyPlayedTitle2: {
    fontSize: 16,
    marginLeft: '20%',
    marginTop: 10,
    marginBottom: 5,
    color: '#fff',
  },
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
    marginBottom: 40,
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
