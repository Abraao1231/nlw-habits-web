import logoImage from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { Login } from './User/Login';
import { UserSideBar } from './User/UserSideBar';
import {useCookies} from 'react-cookie';


export function Header(){

  const [cookies, setCookies] = useCookies();
  

  let component;
  
    if (!cookies.token){
      component = <Login email='' name='Login'/> 
    } else {
      component = <UserSideBar email={cookies.user.email} name={cookies.user.name}/>

    }
    return (
        <div className="w-full px-10 py-5 flex items-center justify-between ">
          <Link to={'/'}>
            <img src={logoImage} alt='Habits'/>
          </Link>
          {component}          
        </div>
    )
}

