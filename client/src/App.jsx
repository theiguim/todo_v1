import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredencials, logout } from "./slicers/authSlice";
import OAuth from "./components/OAuth";
import TodoMain from "./components/TodoMain";



const App = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth.isAuth);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setCredencials({ token }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <>
      <div className="appContainer">
        {isAuth ? <TodoMain /> : <OAuth />}
      </div>
    </>
  );
};

export default App;