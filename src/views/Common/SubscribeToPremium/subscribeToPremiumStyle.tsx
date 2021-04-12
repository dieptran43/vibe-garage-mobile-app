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
  emptyWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plansWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  singlePlan: {
    width: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 5,
  },
  normalSinglePlan: {
    borderColor: 'gray',
  },
  activeSinglePlan: {
    backgroundColor: '#CCAB52',
  },
  continueText: {
    color: '#fff',
  },
  nameText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  timeText: {
    color: '#fff',
    fontSize: 17,
  },
  btnPayWith: {
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12,
    flex: 1,
    marginTop: 40,
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
