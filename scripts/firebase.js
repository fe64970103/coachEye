// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "coacheye-e378d.firebaseapp.com",
    databaseURL: "https://coacheye-e378d.firebaseio.com",
    projectId: "coacheye-e378d",
    storageBucket: "coacheye-e378d.appspot.com",
    messagingSenderId: "1064536780552",
    appId: "1:1064536780552:web:46ce2501863e55e54886bd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


db.collection('sailors').get().then(snapshot => {
    snapshot.docs.forEach(doc => {        
        const sailorDB = doc.data();        
        const sailor = new Sailor(sailorDB.name, sailorDB.sailno);        
        allSailors.push(sailor);        
    });
    console.log(allSailors);
    updateSailorListModal(allSailors);

}).catch(err =>{
    console.log(err);
});