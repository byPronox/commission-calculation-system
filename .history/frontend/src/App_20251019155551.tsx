import { useEffect, useState } from "react";
import { getSellers, getCommissions, seedDemo } from "./lib/api";
import Navbar from "./components/Navbar/Navbar";
import DateRangeFilter from "./components/DateRangeFilter/DateRangeFilter";
import SellersList from "./components/SellersList/SellersList";
import CommissionRules from "./components/CommissionRules/CommissionRules";
import Statistics from "./components/Statistics/Statistics";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import "./styles/main.scss";

export default function App() {
  const [sellers, setSellers] = useState([]);
  const [rules, setRules] = useState([]);
  const [summary, setSummary] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState({
    start: "2025-04-30",
    end: "2025-06-29",
  });

  useEffect(() => {
    getSellers().then(setSellers).catch(() => {});
  }, []);

  const handleSeed = async () => {
    await seedDemo();
    const list = await getSellers();
    setSellers(list);
    alert("Demo data created ✔");
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const data = await getCommissions(period.start, period.end);
      setRules(data.rules || []);
      setSummary(data.summary || null);
      setResults(data.per_seller || []);
    } catch (e) {
      console.error(e);
      alert("Failed to calculate commissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="home">
        <section className="home__filter">
          <h1 className="home__title">Commission Calculation System</h1>
          <DateRangeFilter period={period} setPeriod={setPeriod} onCalculate={handleCalculate} loading={loading} />
          <button className="home__seed" onClick={handleSeed}>Load Demo Data</button>
        </section>

        <section className="home__grid">
          <div className="home__card">
            <SellersList sellers={sellers} />
          </div>
          <div className="home__card">
            <CommissionRules rules={rules} />
          </div>
          <div className="home__card">
            <Statistics summary={summary} />
          </div>
        </section>

        <section className="home__results">
          <ResultsTable results={results} />
        </section>
      </main>
    </>
  );
}
