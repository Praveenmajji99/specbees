import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage'; // You can create a 404 page for invalid URLs
; // Import your global styles

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Handle 404 errors */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
