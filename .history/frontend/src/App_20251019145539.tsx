import "./App.css";

export default function Home() {
  return (
    <main className="home">
      <section className="home__filter">
        <h2 className="home__title">Commission Calculation System</h2>
        <div className="home__dates">
          <input type="date" className="home__input" />
          <input type="date" className="home__input" />
          <button className="home__button">Calculate</button>
        </div>
      </section>

      <section className="home__grid">
        <div className="home__card">Sellers</div>
        <div className="home__card">Commission Rules</div>
        <div className="home__card">Statistics</div>
      </section>
    </main>
  );
}
