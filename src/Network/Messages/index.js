import firebase from '../../Firebase/index';

export const senderMsg = async (msgValue, currentUser, geustUserId, img) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + currentUser)
      .child(geustUserId)
      .push({
        message: {
          sender: currentUser,
          reciever: geustUserId,
          msg: msgValue,
          img: img,
        },
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const recieverMsg = async (msgValue, currentUser, geustUserId, img) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + geustUserId)
      .child(currentUser)
      .push({
        message: {
          sender: currentUser,
          reciever: geustUserId,
          msg: msgValue,
          img: img,
        },
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};
