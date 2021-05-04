import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollViewContent: {
    height: '100%',
    padding: 16,
  },
  layoutContent: {
    display: 'flex',
  },
  walletWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  cashOutWrapper: {
    backgroundColor: '#00bcd4',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
  },
  cashOutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card1: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 7,
    textTransform: 'uppercase',
  },
  valueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cashOutLayout: {
    display: 'flex',
    paddingTop: 30,
  },
  titleInput: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    marginTop: 30,
  },
  btnSend: {
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSendEnabled: {
    backgroundColor: '#00bcd4',
  },
  btnSendDisabled: {
    backgroundColor: '#A0A0A0',
  },
  btnSendText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
