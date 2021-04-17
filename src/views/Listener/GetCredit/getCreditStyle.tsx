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
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
  },
  exitText: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 16,
  },
  viewSpaceBetween: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  commonBtn: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    fontSize: 15,
    borderRadius: 5,
  },
  noBtn: {
    borderColor: 'rgb(4, 42, 43)',
    borderWidth: 1,
    color: 'rgb(4, 42, 43)',
    marginRight: 40,
  },
  yesBtn: {
    backgroundColor: 'rgb(4, 42, 43)',
    color: '#fff',
  },
  isRequestingLoader: {
    marginBottom: 20,
  },
  isRequestingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  loaderTextField: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
