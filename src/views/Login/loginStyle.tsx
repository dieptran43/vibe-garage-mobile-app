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
    marginBottom: 40,
  },
  textInput: {
    height: 40,
    borderRadius: 3,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  forgotPasswordWrapper: {
    marginTop: 10,
    marginLeft: 'auto',
    marginBottom: 50,
  },
  forgotPassword: {
    color: '#0E82FF',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  loginBtnWrapper: {
    backgroundColor: '#00BCD4',
    width: '100%',
    borderRadius: 3,
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
