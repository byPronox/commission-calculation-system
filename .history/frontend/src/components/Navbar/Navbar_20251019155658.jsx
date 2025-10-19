import "./Navbar.scss";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__brand">MiniCore</div>
      <nav className="nav__menu">
        <a className="nav__link" href="#">Home</a>
        <a className="nav__link" href="#">Sellers</a>
        <a className="nav__link" href="#">Sales</a>
      </nav>
    </header>
  );
}
