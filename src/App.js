import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Tours from "./components/Tours";
import "./index.css";
function App() {
  // const url = "https://course-api.netlify.app/api/react-tours-project";

  const url = "https://course-api.com/react-tours-project";

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  //* bu fonksiyonu rootta yazıp childa gönderdik. oradanda id parametresine göre silme işlemi yapılıyor. ve state i tekrar güncelliyoruz.



  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setTours(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button onClick={fetchData} className="btn">
            {/* //! silinecek eleman kalmadıgında buttona fetchData fonksiyonu çağırılır. Parametresi olmadıgı için arrow funca gerek yok. */}
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
