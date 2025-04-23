import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
//   const { user, logout } = useAuth();

  return (
    <nav>
        {/* <Link to="/">Home</Link> |{" "}
        {user ? (
            <>
            <Link to="/dashboard">Dashboard</Link> |{" "}
            <button onClick={logout}>Logout</button>
            </>
        ) : (
            <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
            </>
        )} */}
        <Link to="/register">Register</Link>
    </nav>
  );
};

export default NavBar;
