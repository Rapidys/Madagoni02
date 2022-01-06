import React, {useState} from 'react';
import MyModal from "../../../components/MyModal/MyModal";
import {
  Button,
  Form,
  FormGroup,

} from "shards-react";
import MySelect from "../../../MySelect/MySelect";
import NewPostFields from "./newPostFields";
import PrimaryChart from "../../../components/blog/Chart/PrimaryChart";


const BlogModal = ({newPostModal, onNewPostClose}) => {

  let [title, setTitle] = useState('')
  let [ValidUntil, setValidUntil] = useState('')
  let [body, setBody] = useState('')
  let [fileName, setFileName] = useState('')
  let [stringImg, setStringImg] = useState(null)
  let [postTypeValue, setPostTypeValue] = useState('')
  let addPost = () => {
    let newPost = {
      postId: 0,
      stringPhoto: stringImg,
      title: title,
      Body: body,
      authorId: 0,
      ValidUntil: ValidUntil,
      IsActive: true,
    }
    console.log(newPost)
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

  let onPostTypeChange = (e) => {
    setPostTypeValue(e.target.value)
  }
  return (
    <MyModal
      open={newPostModal}
      onClose={onNewPostClose}
      maxWidth={'sm'}
    >

      <Form className="m-auto">
        <FormGroup>

          <MySelect
            defaultValue={'ტიპი'}
            onChange={onPostTypeChange}
            value={postTypeValue}
            options={[
              {id: 1, displayName: 'სამსახურეობრივი'},
              {id: 2, displayName: 'დასვენებები'},
              {id: 3, displayName: 'მოგზაურობა'},
              {id: 4, displayName: 'დიაგრამა'},
            ]}
          />
        </FormGroup>

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

        <Button theme="secondary"
                onClick={addPost}
        >
          შექმნა
        </Button>
      </Form>

    </MyModal>
  );
};

export default BlogModal;
