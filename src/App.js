import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainSearch from "./component/MainSearch";
import MyCityWeather from "./component/MyCityWeather";

function App() {
  // const [selectedLatLon, setSelectedLatLon] = useState("");
  // const setLatLon = (latLon) => setSelectedLatLon(latLon);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />} />;
        <Route path="/:citylat/:citylon" element={<MyCityWeather />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
