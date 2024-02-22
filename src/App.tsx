import "normalize.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routing"
import { useAppSelector } from "./redux/hooks"
import { selectUserIsAuth } from "./redux/users/selectors"

function App() {
  const isAuth = useAppSelector(selectUserIsAuth)

  return <RouterProvider router={router(isAuth)} />
}

export default App
