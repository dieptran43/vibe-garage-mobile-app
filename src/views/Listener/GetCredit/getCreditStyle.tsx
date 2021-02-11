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
    marginTop: 40,
    borderTopColor: '#00bcd4',
    borderTopWidth: 2.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: 'flex',
  },
  walletInfoRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  getCreditText: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  walletText: {
    fontSize: 20,
    marginBottom: 30,
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
    marginBottom: 40,
    color: '#fff',
    fontSize: 16
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
});

export default styles;
