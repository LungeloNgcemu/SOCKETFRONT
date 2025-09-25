import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrossRoad from './CrossRoad.jsx';
import SocketIO from './SocketIO.jsx';
import SignalR from './SignalR.jsx';

function App() {
''
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrossRoad />} />
        <Route path="/socketio" element={<SocketIO />} />
        <Route path="/signalr" element={<SignalR/>} />
      </Routes>
    </Router>
  );
}

export default App;
