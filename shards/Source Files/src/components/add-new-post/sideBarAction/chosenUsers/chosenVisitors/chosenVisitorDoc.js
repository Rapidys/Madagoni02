import React from 'react';
import {Button, Col, Collapse, Row} from "shards-react";

const ChosenVisitorDoc = ({
                            handleOpenVisitors,
                            setVisibleVisitors,
                            VisibleVisitors,
                            ...props
                          }) => {
  return (
    <div>
      <Button
        className={"w-100"}
        onClick={() => {
          setVisibleVisitors(v => !v)
        }}
      >ვიზირებები</Button>
      <Collapse open={VisibleVisitors}>
         {/*<span className={'circleClases'}>*/}
         {/*    <i className="fas fa-plus-circle mt-3"*/}
         {/*       onClick={handleOpenVisitors}*/}
         {/*    />*/}
         {/* </span>*/}

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
      </Collapse>
    </div>
  );
};

export default ChosenVisitorDoc;
