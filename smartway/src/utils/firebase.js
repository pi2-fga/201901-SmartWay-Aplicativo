import firebase from 'firebase';

// const prodConfig = {
//     apiKey: "***************",
//     authDomain: "***************",
//     databaseURL: "***************",
//     projectId: "***************",
//     storageBucket: "***************",
//     messagingSenderId: "***************"
// };

const devConfig = {
    apiKey: "AIzaSyCMgW3rWewz7xBmpiqH0mTwFSZgnPF9Yn8",
    databaseURL: "https://smartwayapp-1558651212202.firebaseio.com",
    projectId: "smartwayapp-1558651212202",
    storage_bucket: "smartwayapp-1558651212202.appspot.com",
    persistence: true
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
// export const firebaseAuth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();
