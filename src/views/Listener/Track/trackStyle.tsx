import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollViewContent: {
    height: '100%',
    padding: 16,
  },
  layoutContent: {
    display: 'flex',
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  artisteImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  trackCol1: {
    display: 'flex',
    marginRight: 'auto',
    marginBottom: 60,
  },
  followBtn: {
    backgroundColor: '#00bcd4',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  followText: {
    color: '#fff',
  },
  artisteName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  trackUploadDate: {
    fontSize: 13,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: '10%',
  },
  imageBg: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 30
  },
  tracktitle: {
    fontSize: 18,
    marginBottom: 10
  },
});

export default styles;
