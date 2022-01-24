import React, {useState} from 'react';
import MyModal from "../../../components/MyModal/MyModal";
import {Button, Form} from "shards-react";
import NewPostFields from "../blogModal/newPostFields";
import {useDispatch, useSelector} from "react-redux";
import API from "../../../API/ApiBase";
import {getPosts} from "../../../Reducers/posts/blogPostsReducer";
import Preloader from "../../../Preloader/Preloader";

const RedactionModal = ({
                          openRedaction,
                          setOpenRedaction,
                          postValue,
                          setPostInfo
                        }) => {


  let [title, setTitle] = useState('')
  let [ValidUntil, setValidUntil] = useState('')
  let [body, setBody] = useState('')
  let [fileName, setFileName] = useState('')
  let [stringImg, setStringImg] = useState(null)
  let currentPage = useSelector(state => state.PaginationData.currentPage)
  let rowsPerPage = useSelector(state => state.PaginationData.rowsPerPage)
  let dispatch = useDispatch()

  let onRedactiongClose = () => {
    setPostInfo('')
    setOpenRedaction(v => !v)
    setTitle('')
    setValidUntil('')
    setBody('')
    setFileName('')
    setStringImg(null)
  }

  let addPost = () => {
    let newPost = {
      postId: postValue && postValue.postId,
      stringPhoto: stringImg !== null ? stringImg : postValue && postValue.stringPhoto,
      title: title !== '' ? title : postValue && postValue.title,
      Body: body !== '' ? body : postValue && postValue.body,
      ValidUntil: ValidUntil !== '' ? ValidUntil : postValue.validUntil,
      IsActive: true,
    }
    console.log(newPost)
    // API.CreatePost(newPost).then(response => {
    //   dispatch(getPosts({
    //     AdminMode: false,
    //     RecordsPerPage: rowsPerPage,
    //     PageNumber: currentPage
    //   }))
    // })

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
  console.log(postValue)
  return (
    <MyModal
      open={openRedaction}
      onClose={onRedactiongClose}
    >
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
          title={title !== '' ? title : postValue && postValue.title}
          setTitle={setTitle}
          setBody={setBody}
          uploadImg={uploadImg}
          fileName={fileName}
          body={body !== '' ? body : postValue && postValue.body}
          ValidUntil={ValidUntil ? ValidUntil : postValue && postValue.validUntil}
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

export default RedactionModal;
