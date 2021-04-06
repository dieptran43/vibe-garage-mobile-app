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
  btnPayWith: {
    borderRadius: 5,
    alignSelf: 'flex-end',
    paddingHorizontal: 22,
    paddingVertical: 12,
    flex: 1,
  },
  btnPayWithEnabled: {
    backgroundColor: '#00bcd4',
  },
  btnPayWithDisabled: {
    backgroundColor: '#A0A0A0',
  },
  payWithText: {
    fontWeight: 'bold',
  },
  btnStart: {
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#00bcd4',
    paddingHorizontal: 70,
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default styles;
