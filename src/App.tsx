import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index/Index";
import { UsersProvider } from "./context/UsersContext";

function App() {
  return (
    <>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </>
  );
}

export default App;
