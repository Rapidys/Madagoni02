import React from 'react';
import MyModal from "../../../components/MyModal/MyModal";
import {Card, CardBody, Col} from "shards-react";
import defaultPostImg from "../../../assets/defaultPost.jpeg";
import defaultUser from "../../../assets/user.png";
import Editor from "../../../components/add-new-post/editor/Editor";
import ReactQuill from "react-quill";
import styled from "styled-components";


let Styles = styled.div`
  .ql-container.ql-snow {
    border: none;
  }


  .ql-video {
    overflow-y: hidden;
  }

  .card-post__image {
    height: 300px;
  }

  @media (max-width: 500px) {
    .card-body {
      padding: 0.3rem;
    }
    *{
      font-size: 10px;
    }
  }
`

const PostModal = ({postModal, handlePostModal, postInfo}) => {
  return (
    <MyModal
      open={postModal}
      onClose={handlePostModal}
      maxWidth={'md'}

    >
      <Col className="mb-4"
           style={{cursor: 'pointer'}}
      >
        <div className={'d-flex align-items-center'}>
          <a
            href="#"
            className="card-post__author-avatar card-post__author-avatar--large mb-3"
            style={{backgroundImage: `url('${postInfo.authorPhoto ? postInfo.authorPhoto : defaultUser}')`}}
          />
          <span className={'ml-3 mb-3'}>
              {postInfo.author}
            </span>
        </div>


        <Card>
          <Styles>

            <CardBody>
              <div
              >
                <img
                  src={postInfo.stringPhoto ? postInfo.stringPhoto : defaultPostImg}
                  alt="postImg"
                  className={'w-100'}

                />
              </div>
            </CardBody>

            <CardBody style={{minHeight: '200px'}} >
              <h5 className="card-title">
                <a href="#" className="text-fiord-blue">
                  {postInfo.title}
                </a>
              </h5>

              <ReactQuill
                value={postInfo.body || ''}
                readOnly={true}
                className={'border-none'}
                modules={Editor.mods}

              />

              <div className={'mt-4 d-flex'}>
                     <span
                       className="text-muted mt-3">{postInfo.datePublished && postInfo.datePublished.slice(0, 10)}
                  </span>

              </div>

            </CardBody>
          </Styles>

        </Card>
      </Col>

    </MyModal>

  );
};
Editor.mods = {
  toolbar: false,
};
export default PostModal;
