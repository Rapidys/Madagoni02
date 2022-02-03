import React, {useEffect, useState} from 'react';
import {
  Dialog, DialogActions,
  DialogContent,
  DialogTitle, FormControl, MenuItem
} from "@material-ui/core";
import {Card, Col,} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import {
  getComments,
  setModalVisible
} from "../../../../Reducers/Comments/CommentsReducer";
import {useParams} from "react-router-dom";
import {
  createComment
} from "../../../../Reducers/Comments/CreateNewCommentReducer";
import {CommentStyles} from "./commentsStyles";
import NewComment from "./newComment";
import CommentItem from "./commentItem";


const Comments = () => {


  let visible = useSelector(state => state.getComments.isVisibleModal)


  const [textValue, setTextValue] = useState('')
  let params = useParams()

  let dispatch = useDispatch()
  let comments = useSelector(state => state.getComments.comments)


  useEffect(() => {
    if (visible === true) {
      dispatch(getComments(params.id))
      let interval = setInterval(() => {
        dispatch(getComments(params.id))
      }, 5000)
      return () => clearInterval(interval);
    }

  }, [visible])


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
    setTextValue('')
  }

  let setCommentOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      let newComment = {
        DocumentId: Number(params.id),
        CommentBody: textValue,
      }
      dispatch(createComment(newComment, params.id))
      setTextValue('')
    }
  }
  let userImg = useSelector(state => state.userInfo.img)

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <CommentStyles>
        <div className={"closeDiv"}>
          <i className="fa fa-times "
             onClick={handleClose}
          />
        </div>
      </CommentStyles>


      <DialogTitle>კომენტარები</DialogTitle>

      <DialogContent>


        <FormControl sx={{mt: 2, minWidth: 120}} className={"w-100"}>

          <MenuItem value="xl" style={{minHeight: 400, padding: 0}}>

            <Card className={"d-flex flex-column w-100"}>
              <CommentStyles>

                <Col className={"commentBody"}>
                  <CommentItem comments={comments}
                               userImg = {userImg}
                  />
                </Col>
              </CommentStyles>
              <Col>
                <NewComment
                  onTextChange={onTextChange}
                  textValue={textValue}
                  setCommentOnKeyPress={setCommentOnKeyPress}
                  setComment={setComment}
                />

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
