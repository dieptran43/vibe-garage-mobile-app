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
    paddingBottom: 40,
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
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  followText: {
    color: '#fff',
    fontSize: 15,
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
    marginBottom: 30,
  },
  trackTitle: {
    fontSize: 16,
    marginBottom: 15,
  },
  trackActions: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 15,
    marginLeft: 3,
  },
  trackDivider: {
    width: 50,
    height: 2,
    backgroundColor: '#474747',
    marginBottom: 20,
    marginTop: 5,
  },
  trackDescription: {
    marginBottom: 20,
    color: '#fff',
  },
  downloadBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222225',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  downloadText: {
    marginLeft: 5,
  },
  flexJustify: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moreWrapper: {
    position: 'relative',
  },
  moreBtnsWrapper: {
    position: 'absolute',
    top: 25,
    left: -102,
    backgroundColor: '#2f2f2f',
    borderRadius: 5,
    width: 125,
    zIndex: 10,
    paddingLeft: 15,
    // paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  moreBtn: {
    paddingVertical: 12,
  },
  tagRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagText: {
    color: '#00bcd4',
    marginRight: 15,
  },
});

export default styles;
