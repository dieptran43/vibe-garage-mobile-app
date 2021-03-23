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
    width: '85%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 7,
  },
  forgotPwdView: {
    width: '85%',
  },
  alignLeft: {
    marginLeft: 'auto',
    marginTop: 20,
  },
  linkText: {
    color: '#CCAB52',
    marginBottom: 50,
    alignSelf: 'flex-end',
  },
  marginBottom30: {
    marginBottom: 30,
  },
  loginBtnWrapper: {
    width: '85%',
    borderRadius: 5,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnWrapperEnabled: {
    backgroundColor: '#800000',
  },
  loginBtnWrapperDisabled: {
    backgroundColor: 'rgba(128,0,0, 0.2)',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginBottom20: {
    marginBottom: 40,
  },
  grayText: {
    color: '#838383',
    marginRight: 7,
  },
  goldText: {
    color: '#CCAB52',
  },
  facebookBtnWrapper: {
    width: '85%',
    borderRadius: 5,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d68a1',
    flexDirection: 'row',
  },
  fbIcon: {
    marginLeft: 30,
    marginRight: 'auto',
  },
  loginFbBtnText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 'auto',
  },
});

export default styles;
