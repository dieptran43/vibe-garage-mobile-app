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
});

export default styles;
