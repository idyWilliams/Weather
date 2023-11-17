
import { Route, Routes } from "react-router-dom";

import Cities from "./components/Cities";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Cities />} />
      </Routes>
    </div>
  );
}

export default App;
