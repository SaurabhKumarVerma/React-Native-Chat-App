import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDY-lMis-4nZgerONyhiHjYE1at7iUEBV0',
  databaseURL: 'https://chatapp-31d95-default-rtdb.firebaseio.com/',
  projectId: 'chatapp-31d95',
  appId: '1:383548788849:android:c0a39b893905e71ec8cbd0',
};

export default Firebase.initializeApp(firebaseConfig);
