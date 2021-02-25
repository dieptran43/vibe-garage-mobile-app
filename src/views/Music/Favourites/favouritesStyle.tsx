import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  favouritesContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  favouritesContent: {
    marginBottom: 50,
    padding: 16,
  },
  scrollViewContent: {
    height: '100%',
  },
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
    borderBottomColor: 'rgba(255, 255, 255, 0.11)',
    paddingBottom: 10,
    paddingTop: 20,
  },
  divider: {
    borderTopColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
  },
  noOfFavourites: {
    fontSize: 15,
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
  topSongsWrapper: {
    marginTop: 30,
  },
  singleTopSong: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.11)',
    paddingVertical: 10,
  },
  topMusicImage: {height: 60, width: 60, marginRight: 15, borderRadius: 3},
  musicTextWrapper: {
    width: '70%',
  },
  musicTitleText: {color: '#fff', fontSize: 15},
  musicArtisteText: {color: '#8d8d8d', fontSize: 13},
});

export default styles;
