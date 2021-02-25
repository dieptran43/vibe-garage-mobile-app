import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  genresContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollViewContent: {
    height: '100%',
  },
  genresHeader: {
    padding: 16,
  },
  genresText: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 15,
    fontSize: 20,
  },
  genreCards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  singleGenreCard: {
    width: '33%',
    height: 80,
    marginTop: 30,
    alignItems: 'center',
    position: 'relative',
  },
  genreCardImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  genreCardShadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 7,
    top: '35%',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreCardText: {
    fontSize: 16,
  },
  topSongsContent: {display: 'flex', paddingHorizontal: 16, marginBottom: 20},
  noneFoundWrapper: {
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noneFoundText: {color: '#cecece'},
  topSongsWrapper: {
    paddingTop: 30,
  },
  singleTopSong: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
  },
  topMusicImage: {height: 40, width: 40, marginRight: 15, borderRadius: 3},
  musicTextWrapper: {
    width: '70%',
  },
  musicTitleText: {color: '#c3c3c6', fontSize: 15},
  musicArtisteText: {color: '#8d8d8d', fontSize: 13},
  musicMoreIcon: {marginLeft: 'auto'},
});

export default styles;
