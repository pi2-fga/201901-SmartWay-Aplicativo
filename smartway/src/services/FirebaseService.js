import {firebaseDatabase} from '../utils/firebase.js';

export const addItem =  (item) => {
    firebaseDatabase.ref('/linhasOnibus').push({
        name: item
    });
}    

export const getItems = (path) => {
    let itemsRef = firebaseDatabase.ref(path); // path in format '/text_path'
    let docs;    
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            docs = Object.values(data);
            
         });
         return docs;    
}

// export default class FirebaseService {
//     static getDataList = (nodePath, callback, size = 10) => {
//         console.log("node");
//         console.log(nodePath);
        
//         let query = firebaseDatabase.ref(nodePath).limitToLast(size);
//         query.on(nodePath, dataSnapshot => {
//             let items = [];
//             dataSnapshot.forEach(childSnapshot => {
//                 let item = childSnapshot.val();
//                 ///item['key'] = childSnapshot.key;
//                 items.push(item);
//             });
//             callback(items);
//         });

//         return query;
//     };

//     static addFavoriteBusLine =  (item) => {
//         firebaseDatabase.ref('/linhasOnibus').push({
//             favorito: item
//         });
//     }

// }