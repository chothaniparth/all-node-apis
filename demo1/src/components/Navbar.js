import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-sm bg-primary navbar-light">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link active" to="/login">
                Login
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/signup">
              SignUp
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="home">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
