import { Link, Outlet } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/profiles/">The Collective</Link>
                <Link to="/account/:id/">My account</Link>
                <Link to="/login/">Login</Link>
                <Link to="/register/">Register</Link>
                <Link to="/profiles/create/">Create new profile</Link>
            </nav>

            <Outlet />
        </div>
    );
}

export default NavBar;