import logoImage from '../assets/logo.svg'
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Login } from './User/Login';
import { UserSideBar } from './User/UserSideBar';


export function Header(){
  const cookie = new Cookies()
  const user = cookie.get('user');
  const token = cookie.get('token')
  let component;
  
    if (!token){
      component = <Login email='' name='Login'/> 
    } else {
      component = <UserSideBar email={user.email} name={user.name}/>

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

