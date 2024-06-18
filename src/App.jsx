import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import MainContent from "./pages/MainContent.jsx"; // Import the new MainContent component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/articles" element={<MainContent />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
