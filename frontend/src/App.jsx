import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AllContent from './components/writer/AllContent'
import Editor from './components/wysiwyg/TextEditor';
const HomeSkeleton = lazy(() => import('./components/loader/HomeSkeleton'))
const HomePage = lazy(() => import('./pages/HomePage'))
const WriterPage = lazy(() => import('./pages/WriterPage'))
const DashboardSkeleton = lazy(() => import('./components/loader/DashboardSkeleton'))
const ReaderPage = lazy(() => import('./pages/ReaderPage'))
const ReaderSkeleton = lazy(() => import('./components/loader/ReaderSkeleton'))
const Login = lazy(() => import('./auth/Login'))
const LoginSkeleton = lazy(() => import('./components/loader/LoginSkeleton'))
const SignUp = lazy(() => import('./auth/SignUp'))
const SignUpSkeleton = lazy(() => import('./components/loader/SignupSkeleton'))
const WritingLayout = lazy(() => import('./components/writer/WritingLayout'))
const WritingLayoutSkeleton = lazy(() => import('./components/loader/WritingLayoutSkeleton'))

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Suspense fallback={<HomeSkeleton />}><HomePage /></Suspense>} />

            <Route path="/login" element={<Suspense fallback={<LoginSkeleton />}><Login /></Suspense>} />
            <Route path="/signup" element={<Suspense fallback={<SignUpSkeleton />}><SignUp /></Suspense>} />

            <Route path="/dashboard" element={<Suspense fallback={<DashboardSkeleton />}><WriterPage /></Suspense>} />

            <Route path="/write/:contentType" element={<Suspense fallback={<WritingLayoutSkeleton />}><WritingLayout /></Suspense>} >
              <Route path="work-status" element={<><AllContent /></>} />
              <Route path="editor/:contentId" element={<Editor />} />
              <Route path="editor" element={<Editor />} />
              <Route path="" element={<Navigate to="editor" />} />
            </Route>

            <Route path="/read" element={<Suspense fallback={<ReaderSkeleton />}><ReaderPage /></Suspense>}>
              <Route path=":contentType" element={<ReaderPage />} />
            </Route>

          </Routes>
        </Router>
      </Provider>

    </>
  )
}

export default App
