import React from 'react';
import {Col, Row} from "shards-react";
import fire from '../../../../../assets/fire1.gif'
import styled from "styled-components";

let Styles = styled.div`
  .fire {
    width: 30px;
    height: 30px;
    align-self: center;
  }
  @media screen and (max-width: 1100px) {


    .fire {
      width: 25px;
      height: 25px;
    }
  }

  @media screen and (max-width: 991px) {


    .fire {
      width: 30px;
      height: 30px;
    }
  }

`

const Chosen = (props) => {

  return (

    <Col className={'p-0'}>
      {props.chosenDestination && props.chosenDestination.map((u, index) => {
        return <Col className={"mt-2"}
                    key={index}>
          <Styles className={'d-flex flex-column'}>
            <Row className={'text-danger'}
                 style={{fontSize: '11px'}}>
              {u.dueDate && u.dueDate.slice(0, 10)}
            </Row>
            <div className={'d-flex justify-content-between'}>
              {u.firstName || u.targetName
                ? <Row className={"p-2"}><i
                  className="mr-2 mt-1 fas fa-user"
                  style={{color: u.motionColor}}/>


                  {u.firstName} {u.lastName} {u.targetName}
                </Row>
                : <Row className={"p-2"} key={u.departmentId}><i
                  className="mr-2 mt-1 fas fa-university"/>
                  {u.displayName
                    && u.displayName

                  }
                </Row>}
              <Row>
                {u.isExpired === true
                  ? <img src={fire} className={'fire'} alt={'Expired'}/>
                  : ''
                }
              </Row>

            </div>


          </Styles>


        </Col>
      })}


    </Col>
  );
};

export default Chosen;
