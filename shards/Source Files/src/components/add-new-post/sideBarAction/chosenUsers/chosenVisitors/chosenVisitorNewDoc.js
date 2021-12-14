import React from 'react';
import {Button, Col, Row} from "shards-react";

const ChosenVisitorNewDoc = ({handleOpenVisitors,...props}) => {
  return (
    <div>
      <Button onClick={handleOpenVisitors}
              className={"w-100"}
      >ვიზირებები</Button>
      <div>
        <Col>
          {props.chosenVisitor && props.chosenVisitor.map((u, index) => {
            return <Col className={"d-flex justify-content-between mt-2"}
                        key={index}>
              <Row className={"p-2"}>
                <i className="mr-2 mt-1 fas fa-user"
                   style={{color: u.motionColor}}/>
                {u.firstName
                  ? u.firstName + ' ' + u.lastName
                  : u.targetName
                }
              </Row>


            </Col>
          })}
        </Col>
      </div>
    </div>
  );
};

export default ChosenVisitorNewDoc;
