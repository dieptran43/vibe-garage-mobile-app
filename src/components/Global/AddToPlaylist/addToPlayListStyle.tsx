import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    height: '82%',
    paddingTop: 30,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  singlePlayList: {
    borderColor: 'rgba(210,210,210, 0.22)',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  activePlaylist: {
    borderColor: '#00bcd4',
  },
  playlistImage: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  playlistInfoWrapper: {
    width: '60%',
    paddingHorizontal: 10,
  },
  playlistName: {
    marginTop: 2,
    fontSize: 12,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistIcon: {
    marginRight: 5,
  },
  bottomWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  btnWrapperOutline: {
    backgroundColor: '#00bcd4',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnNew: {
    color: '#fff',
  },
  btnSaveWrapperBg: {
    backgroundColor: '#00bcd4',
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 5,
  },
  btnAdd: {
    color: '#fff',
    fontSize: 15,
  },
  btnCancelWrapperBg: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 5,
  },
  btnCancel: {
    color: 'gray',
    fontSize: 15,
  },
  createPlaylistWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  oneWidth: {
    width: '30%',
  },
  twoWidth: {
    width: '60%',
  },
  titleInput: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 40,
    marginTop: 7,
    paddingHorizontal: 7,
    color: '#c3c3c6',
    marginBottom: 15,
  },
  thumbnail: {
    width: '100%',
    height: 80,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailPicker: {
    width: '100%',
    height: 80,
    marginBottom: 40,
    backgroundColor: '#8d8d8d',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickPhotoWrapper: {
    backgroundColor: '#8d8d8d',
    height: 50,
    width: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  markerView: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    marginRight: 7,
  },
  markerSelected: {
    backgroundColor: '#0364FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    marginLeft: 5,
  },
});

export default styles;
