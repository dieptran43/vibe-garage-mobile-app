import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navHeader: {
    backgroundColor: '#222225',
    height: 60,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIconImage: {
    height: 25,
    width: 25,
  },
  logoContainer: {
    width: 107,
    height: 37,
    position: 'relative',
  },
  logoBackground: {
    backgroundColor: '#fff',
    top: 25,
    left: 48,
    position: 'absolute',
    width: 65,
    height: 18,
    zIndex: 0,
  },
  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 20,
    zIndex: 1,
  },
  controlIcons: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
});

export default styles;
