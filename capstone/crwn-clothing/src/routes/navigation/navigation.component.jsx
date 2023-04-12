import { Outlet,Link } from "react-router-dom";
import { Fragment,useContext } from "react";
import { useSelector } from 'react-redux';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import './navigation.styles.scss';

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation=()=>{

  //const {currentUser}=useContext(UserContext);

  const currentUser=useSelector(selectCurrentUser);

  //const {isCartOpen} =useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
    return (
      <Fragment>{/*does not render*/}
       <div className="navigation">
        <Link className="logo-container" to={'/'}>
         <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
               SHOP 
            </Link>
            
            {  currentUser?
              (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>):(<Link className="nav-link" to='/auth'>
              SIGN-IN 
              </Link>)
            }
            <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown/>}
       </div>
        <Outlet/>{/*always present*/}
      </Fragment>
    );
};
export default Navigation;