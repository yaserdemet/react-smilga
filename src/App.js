import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Tours from "./components/Tours";
function App() {
  // const url = "https://course-api.netlify.app/api/react-tours-project";

  const url = "https://course-api.com/react-tours-project";

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false)
      setTours(data)
      console.log(data);
    }
    catch (error){
      console.log(error);
      setLoading(false)
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

  return (
    <main>
      <Tours tours={tours}/>
    </main>
  );
}

export default App;
