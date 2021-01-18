import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  signUpWrapper: {
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
    marginBottom: 30,
  },
  signUpBtnWrapper: {
    width: '85%',
    borderRadius: 5,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10
  },  
  signUpBtnWrapperEnabled: {
    backgroundColor: '#800000',
  },
  signUpBtnWrapperDisabled: {
    backgroundColor: 'rgba(128,0,0, 0.2)',
  },
  signUpBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  grayText: {
    color: '#838383',
    marginRight: 7,
  },
  grayText2: {
    color: '#AEAEAE',
  },
  goldText: {
    color: '#CCAB52',
  },
  marginRight5: {
    marginRight: 5,
  },
  marginLeft5: {
    marginLeft: 5,
  },
});

export default styles;
