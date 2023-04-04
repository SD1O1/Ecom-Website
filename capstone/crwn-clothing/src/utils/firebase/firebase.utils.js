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
import{getFirestore, doc,getDoc,setDoc,} from 'firebase/firestore'


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

const googleprovider = new GoogleAuthProvider();//can be multiple
  googleprovider.setCustomParameters({
    prompt:"select_account"
  });

export const auth =getAuth();//only one for web
export const signInWithGooglePopup=()=>signInWithPopup(auth,googleprovider);
export const signInWithGoogleRedirect =()=>signInWithRedirect(auth,googleprovider);

export const db=getFirestore();

export const createUserDocumentFromAuth=async(userAuth,additionalInformation={})=>{

  if(!userAuth)return ;
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

export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback)