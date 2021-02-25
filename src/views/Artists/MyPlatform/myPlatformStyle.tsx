import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  myPlatformContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  myPlatformContent: {
    position: 'relative',
    display: 'flex',
    height: '100%',
  },
  bannerImage: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  bannerImageBackground: {
    resizeMode: 'cover',
    position: 'absolute',
  },
  artisteImageContainer: {
    position: 'absolute',
    top: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  artisteImage: {
    borderRadius: 120,
    height: 120,
    width: 120,
  },
  myPlatformWrapper: {
    position: 'absolute',
    top: 250,
    width: '100%',
  },
  artisteNameText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  artisteInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  artisteFollowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  artisteFollowText: {
    fontSize: 17,
  },
  artisteFollowBullet: {
    marginHorizontal: 15,
  },
  editProfileWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#434345',
    borderRadius: 20
  },
  editProfileText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default styles;
