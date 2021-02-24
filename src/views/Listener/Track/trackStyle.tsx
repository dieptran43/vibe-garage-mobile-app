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
    marginBottom: 30,
  },
  trackTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  trackActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 7,
  },
  trackDivider: {
    width: 50,
    height: 2,
    backgroundColor: '#474747',
  },
  trackDescription: {
    marginBottom: 40,
  },
  downloadBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadText: {
    marginLeft: 5,
  },
  flexJustify: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
