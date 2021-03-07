import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollViewContent: {
    height: '100%',
    padding: 16,
  },
  uploadContent: {
    marginBottom: 50,
    padding: 16,
  },
  layoutContent: {
    display: 'flex',
  },
  uploadSingleSongText: {
    fontSize: 20,
  },
  iconWrapper: {
    backgroundColor: '#00bcd4',
    height: 70,
    width: 70,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  singleCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222225',
    height: 280,
    marginTop: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  songText: {
    fontSize: 14,
    marginBottom: 30,
    marginTop: 7,
    paddingVertical: 7,
    backgroundColor: '#000',
    borderRadius: 5,
    textAlignVertical: 'top',
    color: '#c3c3c6',
    paddingHorizontal: 7,
  },
  titleText: {
    fontSize: 16,
    marginLeft: 5,
  },
  modalContent: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  titleInput: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 40,
    marginTop: 7,
    paddingHorizontal: 7,
    fontSize: 16,
    color: '#c3c3c6',
    marginBottom: 3,
  },
  titleInfo: {
    color: '#c3c3c6',
    fontSize: 12,
    marginBottom: 40,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailPicker: {
    width: '100%',
    height: 200,
    marginBottom: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#8d8d8d',
    borderStyle: 'dashed',
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
  descriptionInput: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 100,
    marginBottom: 30,
    textAlignVertical: 'top',
    marginTop: 5,
    color: '#c3c3c6',
    paddingHorizontal: 5,
    fontSize: 16,
  },
  attentionText: {
    color: '#c3c3c6',
    marginBottom: 40,
    fontWeight: 'bold',
    fontSize: 16,
  },
  radioBtnsWrapper: {
    marginTop: 10,
    marginBottom: 40,
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
  btnSend: {
    borderRadius: 5,
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 12,
    flex: 1,
    marginTop: 20,
  },
  btnSendEnabled: {
    backgroundColor: '#00bcd4',
  },
  btnSendDisabled: {
    backgroundColor: '#A0A0A0',
  },
  btnSendText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitText: {
    fontSize: 16,
    marginTop: 10
  },
});

export default styles;
