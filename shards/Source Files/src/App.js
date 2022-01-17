import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import AppRouterContainer from "./components/AppRouter";
import MyModal from "./components/MyModal/MyModal";
import {useSelector} from "react-redux";



const App = () => {
  let [expiredSesia, setExpiredSesia] = useState(true)
  let folderCounter = useSelector((state => state.folderCounter.sesiaDie))

  let expiredModal = () => {
    setExpiredSesia(v => !v)
  }

  return (
    <>{
      folderCounter === true && <MyModal
        open={expiredSesia}
        onClose={expiredModal}
      >
        <span>თვენი სესია დასრულდა</span>
        <br/>

      </MyModal>
    }
      <AppRouterContainer/>

    </>

  )


};
export default App
