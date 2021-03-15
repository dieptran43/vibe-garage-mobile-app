import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  purchaseContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  purchaseContent: {
    marginBottom: 50,
    padding: 16,
  },
  scrollViewContent: {
    height: '100%',
  },
  topSongsHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 10,
    paddingTop: 20,
    paddingHorizontal: 16,
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
    backgroundColor: '#3f51b5',
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
    paddingHorizontal: 16,
    paddingBottom: 50
  },
  singleTopSong: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
  },
  topMusicImage: {height: 60, width: 60, marginRight: 15, borderRadius: 3},
  musicTextWrapper: {
    width: '70%',
    marginLeft: 10,
  },
  musicTitleText: {color: '#fff', fontSize: 15},
  musicArtisteText: {color: '#8d8d8d', fontSize: 13},
  moreBtn: {
    marginLeft: 'auto',
  },
});

export default styles;
