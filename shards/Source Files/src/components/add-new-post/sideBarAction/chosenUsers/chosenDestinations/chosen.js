import React from 'react';
import {Col, Row} from "shards-react";

const Chosen = (props) => {
  return (

    <Col>
      {props.chosenDestination && props.chosenDestination.map((u, index) => {
        debugger
        return <Col className={"mt-2"}
                    key={index}>
          <div className={'d-flex flex-column'}>
            <Row className={'text-danger'}
                 style={{fontSize: '11px'}}>
              {u.dueDate && u.dueDate.slice(0, 10)}
            </Row>
            <div>
              {u.firstName || u.targetTypeId === 1
                ? <Row className={"p-2"}><i
                  className="mr-2 mt-1 fas fa-user"
                  style={{color: u.motionColor}}/>


                  {u.firstName} {u.lastName} {u.targetName}
                </Row>
                : <Row className={"p-2"} key={u.departmentId}><i
                  className="mr-2 mt-1 fas fa-university"/>
                  {u.displayName
                    ? u.displayName
                    : u.targetName
                  }
                </Row>}

            </div>

          </div>


        </Col>
      })}


    </Col>
  );
};

export default Chosen;
