import firebase from '../../Firebase/index';

const signInRequest = async (email, password) => {
  try {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default signInRequest;
