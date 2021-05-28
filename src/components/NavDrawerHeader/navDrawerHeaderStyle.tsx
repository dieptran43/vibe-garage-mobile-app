import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navHeader: {
    backgroundColor: '#222225',
    height: 60,
    zIndex: 1,
  },
  navSection: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIconImage: {
    height: 25,
    width: 25,
  },
  logoContainer: {
    width: 107,
    height: 37,
    position: 'relative',
  },
  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 10,
    zIndex: 1,
  },
  controlIcons: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  menuOptionText: {
    fontSize: 15,
    paddingLeft: 7,
    paddingBottom: 5,
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    display: 'flex',
    zIndex: 2,
    backgroundColor: '#222225',
  },
  searchHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 60,
  },
  searchBackIcon: {
    marginRight: 20,
  },
  searchInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 3,
    alignItems: 'center',
  },
  searchInput: {
    paddingHorizontal: 7,
    color: '#0a0a0a',
    fontSize: 15,
    width: '85%',
    height: 40,
  },
  clearSearchIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchBody: {
    display: 'flex',
  },
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
});

export default styles;
