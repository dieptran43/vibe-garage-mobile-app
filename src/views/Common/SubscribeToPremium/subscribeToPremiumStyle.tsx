import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  plansWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  singlePlan: {
    width: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  continueText: {
    color: '#fff',
  },
  priceText: {
    color: '#fff',
    fontSize: 17,
  },
  timeText: {
    color: '#fff',
    fontSize: 17,
  },
});

export default styles;
