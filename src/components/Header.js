import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';

const Header = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <div className="navbar bg-primary text-primary-content">
                <Link to='/' className="btn btn-ghost normal-case text-xl">ARAF</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/'>Home</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/login'>Log in</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/register'>Register</Link>
                {user?.displayName && <span>Welcome, {user.displayName}</span>}
            </div>
        </div>
    );
};

export default Header;