import { Provider } from "react-redux";
import { store } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./components/routes";

const router = createBrowserRouter(routes);  // Create the router using imported routes

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

    </>
  )
}

export default App
