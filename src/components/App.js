import { useState, useEffect } from "react";
import Header from "./Header";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch plants from backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch("http://localhost:6001/plants");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setPlants(data);
      } catch (err) {
        console.error("❌ Error fetching plants:", err);
      }
    };

    fetchPlants();
  }, []);

  // 🔍 Filter logic (clean and reusable)
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header title="🌿 Plantsy Admin Dashboard" />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NewPlantForm plants={plants} setPlants={setPlants} />
      <PlantList plants={filteredPlants} setPlants={setPlants} />
    </div>
  );
}

export default App;
