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
});

export default styles;
