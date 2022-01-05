import React from "react";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import {useSelector} from "react-redux";
import defaultImg from '../../assets/user.png'
import jwtDecode from "jwt-decode";

const UserDetails = () => {

  let user = useSelector(state => state.Auth.currentUser)
  let token = localStorage.getItem('token')
  let decoded = jwtDecode(token);

  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src={user.avatar ? user.avatar :
              defaultImg}
            alt={user.name}
            width="110"
          />
        </div>
        <h4 className="mb-0">{decoded.Email}</h4>
        <span className="text-muted d-block mb-2">{user.jobTitle}</span>
        <Button pill outline size="sm" className="mb-2">
          <i className="material-icons mr-1">person_add</i> Follow
        </Button>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="px-4">
          <div className="progress-wrapper">
            <strong className="text-muted d-block mb-2">
              {user.performanceReportTitle}
            </strong>
            <Progress
              className="progress-sm"
              value={user.performanceReportValue ? user.performanceReportValue : 70}
            >
            <span className="progress-value">
              {user.performanceReportValue ? user.performanceReportValue : 70}%
            </span>
            </Progress>
          </div>
        </ListGroupItem>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            აღწერა
          </strong>
          <span>{user.metaValue ? user.metaValue
            : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?'
          }</span>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
};


export default UserDetails;
