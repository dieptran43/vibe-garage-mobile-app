import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  getCreditContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollViewContent: {
    height: '100%',
    padding: 16,
  },
  layoutContent: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: 'flex',
  },
  layoutWrapper: {
    borderTopColor: '#00bcd4',
    borderTopWidth: 2.5,
    borderRadius: 5,
  },
  orText: {
    marginVertical: 40,
    fontSize: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  walletInfoRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  getCreditText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  walletText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  minAmountText: {
    marginBottom: 3,
  },
  amountInput: {
    backgroundColor: '#171719',
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    color: '#fff',
    fontSize: 14,
  },
  divider: {
    borderTopColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
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
  startText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15
  },
});

export default styles;
