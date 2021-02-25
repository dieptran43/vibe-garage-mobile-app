import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  playlistsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  playlistsContent: {
    marginBottom: 50,
    padding: 16,
  },
  scrollViewContent: {
    height: '100%',
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistsText: {color: '#cecece', fontSize: 18, marginLeft: 10},
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
  playlistsItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  singlePlaylist: {
    borderWidth: 1,
    borderColor: 'rgba(151, 151, 151, 0.3)',
    borderRadius: 5,
    marginBottom: 40,
    width: '47%',
  },
  singlePlaylistRowOne: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  playlistImage: {
    borderRadius: 50,
    height: 35,
    width: 35,
    marginRight: 10,
  },
  playlistTitle1: {
    color: '#fff',
    maxWidth: "70%"
  },
  playlistTitle2: {
    fontSize: 16,
    marginLeft: '20%',
    marginTop: 10,
    marginBottom: 5,
    color: '#fff',
  },
  albumNumberRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumNumberText: {
    fontSize: 16,
    marginLeft: 5,
  },
  imageBackgroundWrapper: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  playButton: {
    position: 'absolute',
    bottom: 10,
    left: '40%'
  },
});

export default styles;
