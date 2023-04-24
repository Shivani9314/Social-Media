import { Routes, Route } from "react-router-dom";
import RequiredUser from "./components/RequiredUser";
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
import toast, {Toaster} from 'react-hot-toast'


export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";


function App() {

  const isLoading = useSelector(state => state.appConfigReducer.isLoading)
  const toastData = useSelector(state => state.appConfigReducer.toastData)
  const loadingRef = useRef();

  useEffect(()=> {
    if(isLoading) {
      loadingRef.current?.continuousStart();
    }
    else{
      loadingRef.current?.complete();
    }
  }, [isLoading])

  useEffect(()=> {
    switch(toastData.type){
      case TOAST_SUCCESS:
                toast.success(toastData.message);
                break;
            case TOAST_FAILURE:
                toast.error(toastData.message);
                break;
    }
  }, [toastData])


  return (
    <div>
      <LoadingBar color= '#5f9fff' ref ={loadingRef}/>
      <div><Toaster/></div>
      <Routes>
        <Route element= {<RequiredUser/>}>
          <Route element= {<Home/>}>
            <Route path="/" element= {<Feed/>}/>
            <Route path="/profile/:userId" element = {<Profile/>}/>
            <Route path="/updateProfile" element = {<UpdateProfile/>}/>
          </Route>
        </Route>
        <Route element = {<OnlyIfNotLoggedIn/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>

      
      
     
    </div>
  )
}

export default App;