import firebase from '../../Firebase/index';

export const AddUser = async (name, email, uid, profileImg) => {
  try {
    return await firebase
      .database()
      .ref('users/' + uid)
      .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};
