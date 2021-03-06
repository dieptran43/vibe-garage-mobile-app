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
    marginTop: 40,
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
  titleText: {
    fontSize: 16,
    marginLeft: 5,
  },
  modalContent: {
    paddingTop: 30,
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
  descriptionInput: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 100,
    marginBottom: 30,
    textAlignVertical: 'top',
    marginTop: 5,
  },
});

export default styles;
