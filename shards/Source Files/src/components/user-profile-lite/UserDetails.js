import React, {useState} from "react";
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
import styled from "styled-components";

let Styles = styled.div`

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 1em;
    color: white;
    background-color: #ffc107;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 6px;
    border-radius: 10px;
  }

  .inputfile:focus + label,
  .inputfile + label:hover {
    background-color: #6294ce;
  }

  .inputfile + label {
    cursor: pointer; /* "hand" cursor */
  }
`

const UserDetails = () => {

  let user = useSelector(state => state.Auth.currentUser)
  let token = localStorage.getItem('token')
  let decoded = jwtDecode(token);
  let [stringImg, setStringImg] = useState(null)

  let uploadImg = (e) => {
    let img = e.target.files
    let reader = new FileReader()
    reader.readAsDataURL(img[0])
    reader.onload = (e) => {
      setStringImg(e.target.result)
      console.log('img', e.target.result)
    }
  }

  return (
    <Styles>
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
          <input type="file"
                 id="file"
                 name="file"
                 className="inputfile"
                 onChange={(e) => uploadImg(e)}
          />
          <label htmlFor="file">
            <div>
              <span>აირჩიეთ</span>

            </div>
            <div>
              <i className="material-icons mr-1">person_add</i>
            </div>
          </label>
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
    </Styles>

  )
};


export default UserDetails;
