import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.js";
import CreateBook from "./Pages/Books/CreateBook.js";
import UpdateBOOK from "./Pages/Books/UpdateBook.js";
import ReadBooks from "./Pages/Books/ReadBooks.js";
import ReadReader from "./Pages/Readers/ReadReader.js";
import CreateReader from "./Pages/Readers/CreateReader.js";
import SideBar from "./components/SideBar.js";
import UpdateReader from "./Pages/Readers/UpdateReader.js";
import ReadChapters from "./Pages/Chapters/ReadChapter.js";
import CreateChapter from "./Pages/Chapters/CreateChapters.js";
import UpdateChapter from "./Pages/Chapters/UpdateChapter.js";
import RequestsCRUD from "./Pages/Requests/RequestsCRUD.js";
import LoginTest from "./Pages/auth/LoginTest.js";
import RegisterTest from "./Pages/auth/RegisterTest.js";
import { About } from "./Pages/Info/About.js";
import ShowRequestsHistory from "./Pages/Requests/ShowRequestsHistory.js";
import ShowHistory from "./ShowHistory.js";

function App() {
  return (
    <div className="App">
      {/* <Outlet /> */}

      <BrowserRouter>
        <SideBar />

        <Routes>
          {/*AUTH*/}

          <Route path="/" element={<LoginTest />}></Route>
          <Route path="/register" element={<RegisterTest />}></Route>

          <Route path="/about" element={<About />}></Route>

          {/*READER*/}

          <Route path="/home" element={<ReadReader />}></Route>
          <Route path="/create" element={<CreateReader />}></Route>
          <Route path="/update/:id" element={<UpdateReader />}></Route>

          {/*CHAPTER*/}

          <Route path="/createChapter" element={<CreateChapter />}></Route>
          <Route path="/readChapters" element={<ReadChapters />}></Route>
          <Route path="/updateChapter/:id" element={<UpdateChapter />}></Route>

          {/*BOOKS*/}

          <Route path="/readBooks" element={<ReadBooks />}></Route>
          <Route path="/updateBook/:id" element={<UpdateBOOK />}></Route>
          <Route path="/createBooks" element={<CreateBook />}></Route>

          {/*REAQUESTS*/}

          <Route path="/readRequests" element={<RequestsCRUD />}></Route>
          <Route path="/homeReader" element={<Home />}></Route>

          <Route
            path="/ShowRequestsHistory/:id"
            element={<ShowRequestsHistory />}
          ></Route>
          <Route path="/ShowHistory" element={<ShowHistory />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
