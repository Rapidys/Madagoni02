import React, {useEffect, useState} from 'react';
import MyModal from "../../../components/MyModal/MyModal";
import {Button, Form} from "shards-react";
import NewPostFields from "../blogModal/newPostFields";
import {useDispatch, useSelector} from "react-redux";
import API from "../../../API/ApiBases";
import {getPosts} from "../../../Reducers/posts/blogPostsReducer";
import Preloader from "../../../Preloader/Preloader";

const RedactionModal = ({
                          openRedaction,
                          setOpenRedaction,
                          postValue,
                          setPostInfo
                        }) => {


  let [title, setTitle] = useState(postValue && postValue.title)
  let [ValidUntil, setValidUntil] = useState(postValue && postValue.validUntil)
  let [body, setBody] = useState(postValue && postValue.body)
  let [fileName, setFileName] = useState('')
  let [stringImg, setStringImg] = useState(postValue && postValue.stringPhoto)
  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let dispatch = useDispatch()


  let onRedactiongClose = () => {
    setOpenRedaction(v => !v)
  }
  let newPost = {
    postId: postValue && postValue.postId,
    stringPhoto: stringImg,
    title: title,
    Body: body,
    ValidUntil: ValidUntil !== '' ? ValidUntil : postValue.validUntil,
    IsActive: true,
  }
  let addPost = () => {
    API.CreatePost(newPost).then(response => {
      dispatch(getPosts({
        AdminMode: false,
        RecordsPerPage: rowsPerPage,
        PageNumber: currentPage
      }))
    })
    setOpenRedaction(false)
  }
  let deletePost = () => {
    newPost.isActive = false
    API.CreatePost(newPost).then(response => {
      dispatch(getPosts({
        AdminMode: false,
        RecordsPerPage: rowsPerPage,
        PageNumber: currentPage
      }))
    })
    setOpenRedaction(false)

  }

  let uploadImg = (e) => {
    let img = e.target.files
    let reader = new FileReader()
    reader.readAsDataURL(img[0])
    setFileName(e.target.files[0].name)
    reader.onload = (e) => {
      setStringImg(e.target.result)
    }
  }
  return (

    <MyModal
      open={openRedaction}
      onClose={onRedactiongClose}
    >
      {
        postValue &&
        <>
          <h6 className={'mb-3'}>პოსტის რედაქტირება</h6>

          <div className={'d-flex align-items-center mb-3'}>
            <div>
              <img src={postValue && postValue.authorPhoto} alt="authorPhoto"
                   className={'rounded-circle'}/>
            </div>
            <div className={'ml-3'}>
              {postValue && postValue.author}
            </div>
          </div>
          <Form className="m-auto">
            <NewPostFields
              title={title}
              setTitle={setTitle}
              setBody={setBody}
              uploadImg={uploadImg}
              fileName={fileName}
              body={body}
              ValidUntil={ValidUntil && ValidUntil.slice(0, 10)}
              setValidUntil={setValidUntil}
            />
            <Button className={'btn-primary'}
                    onClick={addPost}
            >
              შეცვლა
            </Button>
            <Button className={'btn-danger ml-2'}
                    onClick={deletePost}
            >
              წაშლა
            </Button>
          </Form>

        </>

      }

    </MyModal>

  );
};

export default RedactionModal;
