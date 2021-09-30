import firebase from '../../Firebase/index';

const LogOut = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (error) {
    return error;
  }
};

export default LogOut;
