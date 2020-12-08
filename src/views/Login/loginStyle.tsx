import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  loginWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 16,
  },
  appLogo: {
    height: 100,
    width: 229,
    marginBottom: 60,
  },
  textInput: {
    height: 40,
    borderRadius: 3,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 7,
    marginTop: 5
  },
  forgotPasswordWrapper: {
    marginTop: 10,
    marginLeft: 'auto',
    marginBottom: 50,
  },
  forgotPassword: {
    color: '#C4A953',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  loginBtnWrapper: {
    backgroundColor: '#790303',
    width: '100%',
    borderRadius: 5,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16
  },
});

export default styles;
