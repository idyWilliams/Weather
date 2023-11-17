
import { Route, Routes } from "react-router-dom";

import Cities from "./components/Cities";
import CityDetails from "./components/CityDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Cities />} />
        <Route path="/city-details/:cityName" element={<CityDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
