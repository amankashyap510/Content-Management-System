import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContentForm from './components/ContentForm';
import SubmittedContent from './components/SubmittedContent';

// function Home() {
//   return <h0>Content Management System</h1>;
// }
function App() {
  return (
    <Router>
      <div>
      <h1>Content Management System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/submit">Submit Content</Link>
            </li>
            <li>
              <Link to="/submitted">Submitted Content</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<ContentForm />} />
          <Route path="/submitted" element={<SubmittedContent />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Happy Learning</h1>;
}

export default App;
