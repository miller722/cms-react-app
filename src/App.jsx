import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import tabsData from "./tabs.json";
import { Tabs } from "./components/tabs/Tabs.style";
import Tab from "./components/Tab";
import "./App.css";

const DummyTable = lazy(() => import("./components/tabs/DummyTable"));
const DummyChart = lazy(() => import("./components/tabs/DummyChart"));
const DummyList = lazy(() => import("./components/tabs/DummyList"));

function App() {
  const [tabs, setTabs] = useState([]);

  const indicateComponent = (path) => {
    if (path === "dummyTable") {
      return <DummyTable />;
    } else if (path === "dummyList") {
      return <DummyList />;
    } else if (path === "dummyChart") {
      return <DummyChart />;
    }
  };

  useEffect(() => {
    setTabs(tabsData);
  }, []);

  return (
    <div className="wrapper">
      <Router>
        <Tabs>
          {tabsData.map((tab) => (
            <Tab tab={tab} key={tab.id} />
          ))}
        </Tabs>

        <hr />
        <Routes>
          <Route path="/" element={<Navigate to="/dummyTable" />} />
          {tabsData.map((tab) => (
            <Route
              key={tab.id}
              path={`/${tab.id}`}
              element={
                <Suspense fallback={<h2>🌀 Loading...</h2>}>
                  {indicateComponent(tab.id)}
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <hr />
      </Router>
    </div>
  );
}

export default App;
