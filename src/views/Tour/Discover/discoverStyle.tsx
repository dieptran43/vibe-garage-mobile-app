import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  discoverContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  discoverContent: {
    marginBottom: 50,
  },
  scrollViewContent: {
    height: '100%',
  },
  carouselContainer: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 250,
    margin: 16,
    position: 'relative',
  },
  carouselImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  carouselText: {
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0, 0.4)',
  },
  carouselContent: {
    // marginBottom: 60,
  },
  contentWrapper: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  rowTag: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.11)',
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  showAllText: {
    fontSize: 12,
    marginRight: 10,
  },
  playlistsText: {color: '#cecece', fontSize: 16, marginLeft: 10},
  graphBg: {
    backgroundColor: '#4caf50',
    borderRadius: 50,
    height: 35,
    width: 35,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistsItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  arrowWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
    height: 32,
    width: 32,
  },
  marginRight: {
    marginRight: 10,
  },
  singleCard: {
    width: '50%',
  },
  cardImage: {
    height: 180,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
  },
  cardText2: {},
});

export default styles;
