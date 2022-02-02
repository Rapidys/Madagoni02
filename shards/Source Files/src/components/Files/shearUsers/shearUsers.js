import React from 'react';
import {
  FilterUsersAC, shareChosenUsersAC,
} from "../../../Reducers/files/UpdateFileReducer";
import {useDispatch} from "react-redux";
import {Container} from "shards-react";
import {useHistory, useParams} from "react-router-dom";
import styled from 'styled-components'

let Styles = styled.div`
  @media (max-width: 500px) {
    * {
      font-size: 10px;
    }
  }
`
const ShearUsers = ({sharedUsers}) => {


  let dispatch = useDispatch()
  let history = useHistory()
  let url = history.location.pathname
  let params = useParams()

  let filterShareds = (item, userId) => {
    if (url === `/file/${params.id}`) {
      item.isActive = false
      dispatch(shareChosenUsersAC(sharedUsers))
    } else {
      dispatch(FilterUsersAC(userId))
    }
  }

  return (
    <Styles>
      <Container className={'mb-5'}>
        <div className={'mt-5'}>
          {sharedUsers && sharedUsers.map((item, index) => {
            {
              if (item.isActive === true) {
                return <div key={index}
                            className={`d-flex justify-content-between mt-3 p-2 w-100 border`}
                >
                  <div>
                    {item.displayName}
                  </div>
                  <div>
                    <i className="fa fa-times text-danger"
                       style={{cursor: 'pointer'}}
                       onClick={() => filterShareds(item, item.userId)}
                    />
                  </div>
                </div>
              }
            }

          })}
        </div>

      </Container>

    </Styles>

  );
};

export default ShearUsers;
