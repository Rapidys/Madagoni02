import React, {useMemo} from 'react';
import RangeDatePicker from "../../../../common/RangeDatePicker";
import {useSelector} from "react-redux";
import styled from "styled-components";

let Styles = styled.div`

  .fileNamesWrapper {
    width: 250px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    display: flex;
    justify-content: space-between;

  }
  @media(max-width: 500px){
    *{
      font-size: 10px;
    }
  }
`


const ChosenDestinations = (props) => {


  let MotionDest = useSelector((state => state.docMotion.MotionDest))


  let deleteUsers = useMemo(() => {
    return (userId, displayName) => props.setDestination && props.setDestination(props.destination.filter(p => {
      if (p.displayName && p.departmentId) {
        return p.displayName !== displayName
      } else {
        return p.userId !== userId
      }
    }))
  }, [props.destination, props.setDestination])


  let deleteMotions = useMemo(() => {
    return (userId) => [MotionDest].filter(p => p.userId !== userId)
  }, [MotionDest])


  let deleteChosen = (userId, displayName) => {
    deleteUsers(userId, displayName)
    deleteMotions(userId)
  }

  if (props.destination.length === 0) {
    return <div>არჩეულები არ არიან</div>
  }

  return (
    <Styles>
      {props.destination.length > 0 && props.destination.map((user, index) => {
        return (
          <div key={index}
          >
            <div className={"d-flex justify-content-between p-2 mt-1"}>
              <div className={'fileNamesWrapper'}>
                {user.firstName
                  ? user.firstName + ' ' + user.lastName
                  : user.displayName
                }
              </div>
              <div style={{cursor: "pointer"}}
                   onClick={(e) => {
                     e.stopPropagation()
                     deleteChosen(user.userId, user.displayName)
                   }}
              >
                <i className="fa fa-times"/>
              </div>

            </div>
            <div>
              <RangeDatePicker
                save={props.save}
                index={index}
                handleSetDate={props.handleSetDate}
                destination={props.destination}
              />
            </div>
          </div>
        )
      })
      }


    </Styles>
  );
};

export default ChosenDestinations;
