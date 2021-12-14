import React, {useMemo} from 'react';
import {useSelector} from "react-redux";

const ChosenVisitors = (props) => {

  // userebis washla
  let MotionVis = useSelector((state => state.docMotion.MotionVis))

  let deleteUsers = useMemo(() => {
    return (userId) => props.changeState && props.changeState(props.userState.filter(p => p.userId !== userId))
  }, [props.userState, props.changeState])


  let deleteMotions = useMemo(() => {
    return (userId) => [MotionVis].filter(p => p.userId !== userId)
  }, [MotionVis])


  let deleteChosen = (userId) => {
    deleteUsers(userId)
    deleteMotions(userId)
  }

  if (props.userState.length === 0) {
    return <div>არჩეულები არ არიან</div>
  }
  return (
    <div>
      {props.userState.length > 0 && props.userState.map(user => {
        return (

          <div key={user.userId}
          >
            <div className={"d-flex justify-content-between border p-2 mt-1"}>
              <div>{user.firstName} {user.lastName} </div>
              <div style={{cursor: "pointer"}}
                   onClick={(e) => {
                     e.stopPropagation()
                     deleteChosen(user.userId)
                   }}
              >
                <i className="fa fa-times"/>

              </div>
            </div>

          </div>
        )
      })}

    </div>
  );
};

export default ChosenVisitors;
