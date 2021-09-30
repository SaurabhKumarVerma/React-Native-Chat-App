import firebase from '../../Firebase/index';

const loginRequest = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default loginRequest;
