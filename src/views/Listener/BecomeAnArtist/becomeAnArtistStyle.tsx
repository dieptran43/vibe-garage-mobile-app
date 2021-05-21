import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  becomeAnArtistContainer: {
    flex: 1,
    backgroundColor: '#171719',
  },
  scrollViewContent: {
    height: '100%',
    padding: 16,
  },
  becomeAnArtistContent: {
    marginBottom: 50,
    padding: 16,
  },
  layoutContent: {
    marginTop: 40,
    display: 'flex',
    paddingBottom: 100,
  },
  becomeArtistText: {
    fontSize: 18,
    marginBottom: 20,
  },
  getVerifiedText: {
    backgroundColor: '#3d5060',
    padding: 15,
    fontSize: 15,
    marginBottom: 30,
  },
  nameRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameInput: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 40,
    marginBottom: 3,
    paddingHorizontal: 7,
    fontSize: 16,
    color: '#c3c3c6',
  },
  nameText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#d2d2d2',
  },
  showIdText: {
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
  distinctPhotoText: {
    fontSize: 12,
    marginBottom: 20,
  },
  personalPhotoText: {
    fontSize: 16,
  },
  personalPhotoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    backgroundColor: '#000',
    borderRadius: 5,
    marginBottom: 25,
  },
  additionalDetailsInput: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 100,
    marginBottom: 30,
    textAlignVertical: 'top',
    color: '#c3c3c6',
    fontSize: 15,
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
  reviewText: {
    fontSize: 13,
    color: '#8d8d8d',
    marginTop: 15,
  },
  divider: {
    borderTopColor: 'gray',
    borderWidth: 1,
    marginTop: 15,
  },
  emptyContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default styles;
