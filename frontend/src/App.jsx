import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AllContent from './components/writer/AllContent';
import EditorComponent from "./components/wysiwyg/Editor";

import HomePage from './pages/HomePage';
import WriterPage from './pages/WriterPage';
import ReaderPage from './pages/ReaderPage';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import WritingLayout from './components/writer/WritingLayout';
import Discover from "./pages/Discover";
import Header from './components/Header'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<WriterPage />} />

          <Route path="/write/:contentType" element={<WritingLayout />}>
            <Route path="work-status" element={<AllContent />} />
            <Route path="editor/:contentId" element={<EditorComponent />} />
            <Route path="editor" element={<EditorComponent />} />
            <Route path="" element={<Navigate to="editor" />} />
          </Route>

          {/* <Route path="/discover" element={<ReaderPage />}> */}
          {/* <Route path=":contentType" element={<ReaderPage />} /> */}
          {/* </Route> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
