import React, {useState} from 'react';
import MyModal from "../../../components/MyModal/MyModal";
import {
  Button,
  Form,
} from "shards-react";
import NewPostFields from "./newPostFields";
import API from "../../../API/ApiBase";
import {getPosts} from "../../../Reducers/posts/blogPostsReducer";
import {useDispatch, useSelector} from "react-redux";


const BlogModal = ({
                     newPostModal,
                     onNewPostClose,
                     setNewPostModal,
                     setSuccessfullyPosted
                   }) => {

  let [title, setTitle] = useState('')
  let [ValidUntil, setValidUntil] = useState('')
  let [body, setBody] = useState('')
  let [fileName, setFileName] = useState('')
  let [stringImg, setStringImg] = useState(null)
  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let dispatch = useDispatch()

  let addPost = () => {
    let newPost = {
      postId: 0,
      stringPhoto: stringImg,
      title: title,
      Body: body,
      ValidUntil: ValidUntil,
      IsActive: true,
    }
    API.CreatePost(newPost).then(response => {
      setNewPostModal(false)
      setSuccessfullyPosted(true)
      dispatch(getPosts({
        AdminMode: false,
        RecordsPerPage: rowsPerPage,
        PageNumber: currentPage
      }))
      setTitle('')
      setBody('')
      setFileName('')
      setStringImg(null)
      setValidUntil('')
    })

  }


  let uploadImg = (e) => {
    let img = e.target.files
    let reader = new FileReader()
    reader.readAsDataURL(img[0])
    setFileName(e.target.files[0].name)
    reader.onload = (e) => {
      setStringImg(e.target.result)
      console.log('img', e.target.result)
    }
  }


  return (
    <MyModal
      open={newPostModal}
      onClose={onNewPostClose}
      maxWidth={'sm'}
    >

      <Form className="m-auto">

        <NewPostFields
          title={title}
          setTitle={setTitle}
          setBody={setBody}
          uploadImg={uploadImg}
          fileName={fileName}
          body={body}
          ValidUntil={ValidUntil}
          setValidUntil={setValidUntil}
        />

        <Button className={'btn-primary'}
                onClick={addPost}
        >
          შექმნა
        </Button>
      </Form>

    </MyModal>
  );
};

export default BlogModal;
