import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  becomeAnArtistContainer: {
    flex: 1,
    backgroundColor: '#000',
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
  },
  becomeArtistText: {
    fontSize: 18,
    marginBottom: 30,
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
  },
  nameInput: {
    backgroundColor: '#171719',
    borderRadius: 5,
    height: 40,
    marginBottom: 40,
  },
  showIdText: {},
  distinctPhotoText: {},
  personalPhotoText: {},
});

export default styles;
