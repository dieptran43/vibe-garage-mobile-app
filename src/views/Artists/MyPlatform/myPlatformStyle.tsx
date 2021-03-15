import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  myPlatformContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  myPlatformContent: {
    flex: 1,
  },
  bannerImage: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  bannerImageBackground: {
    resizeMode: 'cover',
    position: 'absolute',
  },
  artisteImageContainer: {
    position: 'absolute',
    top: 70,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  artisteImage: {
    borderRadius: 100,
    height: 80,
    width: 80,
  },
  myPlatformWrapper: {
    position: 'absolute',
    top: 170,
    width: '100%',
    height: '100%',
  },
  artisteNameText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  checkBg: {
    backgroundColor: '#3D8CFA',
    width: 20,
    height: 20,
    borderRadius: 50,
    marginLeft: 10,
  },
  checkRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  artisteUsername: {
    marginBottom: 10,
  },
  artisteInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  artisteFollowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  artisteFollowText: {
    fontSize: 15,
  },
  artisteFollowBullet: {
    marginHorizontal: 15,
  },
  editProfileWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#434345',
    borderRadius: 20,
  },
  editProfileText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tabHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  tabTextWrapper: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  activeTabTextWrapper: {
    borderBottomColor: '#00bcd4',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#00bcd4',
  },
  scrollViewContent: {
    height: '100%',
    paddingHorizontal: 16
  },
  singleSpotlightWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 20,
  },
  spotlightRowOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  spotlightRowTwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222225',
    padding: 16,
    borderRadius: 3,
  },
  artistImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  artistName: {
    marginBottom: 10,
    fontSize: 13,
  },
  artistInfo: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  moreIcon: {
    marginLeft: 'auto',
  },
  albumImage: {
    height: 55,
    width: 55,
    marginRight: 15,
  },
  albumName: {
    width: '60%',
  },
  songDuration: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  historyIcon: {fontSize: 12, marginLeft: 5},
  singleSongWrapper: {
    backgroundColor: '#222225',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionOne: {
    borderBottomWidth: 1,
    borderBottomColor: '#363636',
    paddingBottom: 10,
    flex: 1,
  },
  songOwner: {
    marginBottom: 15,
  },
  singleSongAvatar: {
    height: 60,
    width: 60,
    marginRight: 20,
  },
  boughtTrackText: {
    marginLeft: 'auto',
    fontSize: 11,
    marginBottom: 10,
  },
  purchaseWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  priceText: {
    marginRight: 15,
  },
  purchaseText: {
    color: '#fff',
    backgroundColor: '#00bcd4',
    borderRadius: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
  songBottomRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
