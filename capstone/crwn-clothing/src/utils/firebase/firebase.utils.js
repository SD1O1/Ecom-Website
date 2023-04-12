import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import{getFirestore, doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDINyp8byo_uAISM_27CK0W1PVjtG4VCHA",
    authDomain: "crwn-clothing-50479.firebaseapp.com",
    projectId: "crwn-clothing-50479",
    storageBucket: "crwn-clothing-50479.appspot.com",
    messagingSenderId: "284847716775",
    appId: "1:284847716775:web:32f85cb1b0846cccee5e82"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);///we do stuff with this instance 

const googleProvider = new GoogleAuthProvider();//can be multiple
  googleProvider.setCustomParameters({
    prompt:"select_account"
  });

export const auth =getAuth();//only one for web
export const signInWithGooglePopup=()=>signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect =()=>signInWithRedirect(auth,googleProvider);

export const db=getFirestore();

export const addCollectionAndDocuments=async(collectionKey, objectsToAdd,field)=>{

  const collectionRef =collection(db,collectionKey);
  const batch = writeBatch(db);
  
  objectsToAdd.forEach((object)=>{
    const docRef =doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef,object);
  });

  await batch.commit();
  //console.log('lol');
};

export const getCategoriesAndDocuments=async()=>{
  const collectionRef =collection(db,'catogaries');
  const q=query(collectionRef);

  const querySnapshot=await getDocs(q);
  const categoryMap=querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title,items}=docSnapshot.data();
    acc[title.toLowerCase()]=items;
    return acc;
  },{});
  return categoryMap;
};

export const createUserDocumentFromAuth=async(userAuth,additionalInformation={})=>{

  if(!userAuth)return;

  const userDocRef=doc(db,'users',userAuth.uid);
    //console.log(userDocRef);
  const userSnapShot=await getDoc(userDocRef);
    //console.log(userSnapShot);
    //console.log(userSnapShot.exists());

  if(!userSnapShot.exists()){
        const {displayName,email}=userAuth;
        const createdAt=new Date();

        try{
            await setDoc(userDocRef,{
                displayName,email,createdAt,...additionalInformation,
            });
        }catch(error){
            console.log('error creating the user',error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password)return ;
  return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password)return ;
  return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser=async()=> await signOut(auth);

export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback);