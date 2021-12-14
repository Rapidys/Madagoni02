import React, {useEffect, useState} from 'react';
import {
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, FormControl, MenuItem
} from "@material-ui/core";
import {Button, Card, Col, FormTextarea, Row,} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {
  getComments,
  setModalVisible
} from "../../../../Reducers/Comments/CommentsReducer";
import {useParams} from "react-router-dom";
import {createComment} from "../../../../Reducers/Comments/CreateNewCommentReducer";

let Styles = styled.div`
  .commentBody {
    height: 250px;
    overflow-y: scroll;
  }

  .imgDiv {
    width: 50px;
    height: 60px;
    margin-right: 2rem
  }

  .imgDiv img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .textDiv {
    max-width: 370px;
    display: inline-block;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    border-radius: 10px;
    padding: 5px;
  }

  .textDiv:hover {
    background: #00b8d8;
  }

  @media screen and (max-width: 625px) {
    .textDiv {
      max-width: 270px;
    }
  }
  @media screen and (max-width: 530px) {
    .textDiv {
      max-width: 170px;
      font-size: 12px;
    }

    .imgDiv {
      width: 40px;
      height: 50px;

    }
  }
  @media screen and (max-width: 455px) {
    .textDiv {
      max-width: 170px;
      font-size: 11px;
    }

    .imgDiv {
      width: 40px;
      height: 50px;
      margin-right: 1rem;
    }
  }
  @media screen and (max-width: 380px) {
    .textDiv {
      max-width: 140px;
    }
  }
  @media screen and (max-width: 350px) {
    .textDiv {
      max-width: 100px;
    }
  }

  .closeDiv {
    float: right;
    padding: 10px;
    cursor: pointer;
  }

`

const Comments = () => {


  let visible = useSelector(state => state.getComments.isVisibleModal)
  let visibleBtn = useSelector(state => state.getComments.isVisibleBtn)

  const [textValue, setTextValue] = useState('')
  let params = useParams()

  let dispatch = useDispatch()
  let comments = useSelector(state => state.getComments.comments)


  useEffect(() => {
    if (params.id) {
      dispatch(getComments(params.id))
      let interval = setInterval(() => {
        dispatch(getComments(params.id))
      }, 5000)
      return () => clearInterval(interval);
    }
  }, [])


  let onTextChange = (e) => {
    setTextValue(e.target.value)
  }

  const handleClose = () => {
    dispatch(setModalVisible(false))
  };

  let setComment = () => {
    let newComment = {
      DocumentId: Number(params.id),
      CommentBody: textValue,
    }
    dispatch(createComment(newComment, params.id))

  }
  let userImg = useSelector(state => state.userInfo.img)
  console.log('working')
  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <Styles>
        <div className={"closeDiv"}>
          <i className="fa fa-times "
             onClick={handleClose}
          />
        </div>
      </Styles>


      <DialogTitle>კომენტარები</DialogTitle>

      <DialogContent>
        <DialogContentText>
          აირჩიეთ სასურველი ავტორები
        </DialogContentText>

        <FormControl sx={{mt: 2, minWidth: 120}} className={"w-100"}>

          <MenuItem value="xl" style={{minHeight: 400, padding: 0}}>

            <Card className={"d-flex flex-column w-100"}>
              <Styles>

                <Col className={"commentBody"}>
                  {comments && comments.map(mess => {
                    return <Row key={mess.documentCommentId}
                                className={'d-flex justify-content-between align-items-center'}>
                      <div
                        className={"p-2 d-flex justify-content-between align-items-center"}>
                        <div className='imgDiv ml-2 '>
                          <img src={userImg ? userImg :
                            <i className="fas fa-user"/>}
                               alt="#"
                          />
                        </div>
                        <div className="textDiv">
                          <div className={'font-weight-bold'}>
                            {mess.commentUser}
                          </div>
                          <div>
                            {mess.commentBody}
                          </div>
                        </div>

                      </div>
                      <div>
                        {mess.commentDate.slice(11, 19)}
                      </div>
                    </Row>
                  })}
                </Col>
              </Styles>
              <Col>
                <div>
                  <p className="mb-2">
                    {"🤔 Waiting for you to say something..."}
                  </p>
                  <FormTextarea onChange={onTextChange} value={textValue}
                                placeholder='კომენტარი ...'
                                className={"mb-3"}/>
                  <Button
                    onClick={setComment}
                  >
                    გაგზავნა
                  </Button>

                </div>

              </Col>
            </Card>

          </MenuItem>
        </FormControl>

      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>


  );
};

export default Comments;
