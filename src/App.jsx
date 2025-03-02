import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { About, Contact } from "./pages";

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
