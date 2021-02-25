import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  myPlaylistsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  playlistsHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    paddingTop: 20,
  },
  graphBg: {
    backgroundColor: '#00bcd4',
    borderRadius: 50,
    height: 35,
    width: 35,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistsText: {color: '#cecece', fontSize: 18, marginLeft: 10},
  flexRowJustify: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
  },
  noOfmyPlaylist: {
    fontSize: 15,
  },
  btnCreatePlaylist: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bcd4',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 7,
    marginLeft: 'auto',
  },
  createText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollViewContent: {
    height: '100%',
  },
  singlePlayList: {
    borderColor: 'rgba(210,210,210, 0.22)',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
  playlistImage: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  playlistInfoWrapper: {
    width: '60%',
    paddingHorizontal: 10,
  },
  myPlaylistsContent: {
    marginBottom: 50,
    padding: 16,
  },
  playlistName: {
    marginTop: 5,
    fontSize: 15,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  playlistIcon: {
    marginRight: 5,
  },
  moreWrapper: {
    position: 'relative',
  },
  moreBtns: {
    position: 'absolute',
    top: 25,
    left: -102,
    backgroundColor: '#222225',
    borderRadius: 5,
    width: 125,
    zIndex: 1,
    paddingLeft: 15,
    paddingVertical: 15
  },
});

export default styles;
