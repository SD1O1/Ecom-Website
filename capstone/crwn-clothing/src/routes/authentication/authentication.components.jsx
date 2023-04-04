
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication=()=>{

    /*useEffect( ()=>{
      async function t(){
        const response=await getRedirectResult(auth);
        //console.log(response);
        if(response){
          const userDocRef= await createUserDocumentFromAuth(response.user);  
        }
      }t();
    },[])//t function ...i have done my own*/

    {/*const logGoogleRedirectUser=async()=>{
        const {user}=await signInWithGoogleRedirect();
        console.log(user);
        {/*takes to sepearte page...no console log....code after not triggering....as it went to different url it does not remember about previos one...every thing start from scratch....we should store it }
    }*/}

    return(
      <div className='authentication-container'>
      {/*<button onClick={logGoogleUser}>
      ign in with Google
      </button>*/}
    <SignInForm/> 
    <SignUpForm/>
    </div>
    ); 
};
export default Authentication;