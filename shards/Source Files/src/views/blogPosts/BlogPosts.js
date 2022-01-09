/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, {useEffect, useState} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import BlogModal from "./blogModal/blogModal";
import {getPosts} from "../../Reducers/posts/blogPostsReducer";
import ReactQuill from "react-quill";
import Editor from "../../components/add-new-post/editor/Editor";
import styled from 'styled-components'
import MyModal from "../../components/MyModal/MyModal";
import Preloader from "../../Preloader/Preloader";
import defaultPostImg from '../../assets/defaultPost.jpeg'
import defaultUser from '../../assets/user.png'

let Styles = styled.div`
  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    padding: 0;
  }
`

let BlogPosts = () => {

  let BlogPosts = useSelector((state => state.BlogPosts.PostsListOne))
  let isLoadingPosts = useSelector((state => state.BlogPosts.isLoadingPosts))

  let [newPostModal, setNewPostModal] = useState(false)
  const [successfullyPosted, setSuccessfullyPosted] = useState(false)
  let onSuccessfullyClosed = (e) => {
    setSuccessfullyPosted(e => !e)
  }
  let onNewPostClose = () => {
    setNewPostModal(e => !e)
  }
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts({
      AdminMode: false,
      RecordsPerPage: 5,
      PageNumber: 1
    }))
  }, [])

  if (isLoadingPosts) {
    return <Preloader/>
  }
  return (
    <Styles>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters
             className="page-header py-4 d-flex justify-content-between">
          <PageTitle sm="4" title="პოსტები"
                     className="text-sm-left "/>
          <Button className={'btn-info'}
                  onClick={onNewPostClose}
                  style={{height: '50px'}}
          >
            პოსტის დამატება
          </Button>
          <BlogModal
            onNewPostClose={onNewPostClose}
            newPostModal={newPostModal}
            setNewPostModal={setNewPostModal}
            setSuccessfullyPosted={setSuccessfullyPosted}
          />
        </Row>

        {/* First Row of Posts */}
        <Row>
          <MyModal
            open={successfullyPosted}
            onClose={onSuccessfullyClosed}
            maxWidth={'sm'}
            title={'წარმატებულად დაიპოსტა'}
          />
          {BlogPosts && BlogPosts.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{backgroundImage: `url(${post.stringPhoto ? post.stringPhoto : defaultPostImg})`}}
                >

                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{backgroundImage: `url('${post.authorPhoto ? post.authorPhoto : defaultUser}')`}}
                    >
                      Written by {post.author}
                    </a>
                  </div>
                </div>
                <CardBody style={{minHeight: '200px'}}>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <div>
                    <ReactQuill
                      value={post.body.slice(0, 120)}
                      readOnly={true}
                      modules={Editor.modules}
                      className={'border-none'}

                    />
                  </div>


                  <span
                    className="text-muted">{post.datePublished.slice(0, 10)}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </Styles>

  );

}
Editor.modules = {
  toolbar: false,
};
export default BlogPosts;
