/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, {useEffect, useState} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button, CardFooter
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
import {Tooltip} from "@material-ui/core";
import PostModal from "./postModal/postModal";
import Pagination from "../../Pagination/Pagination";
import NewPostFields from "./blogModal/newPostFields";
import RedactionModal from "./redactingModal/RedactionModal";


let Styles = styled.div`
  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    padding: 0;
  }

  @media (min-width: 991px) {
    .cardWrapper {
      min-height: 430px;
    }
  }
  @media (max-width: 1000px) {
    .title {
      font-size: 14px;
    }
  }
  @media (max-width: 991px) {
    .cardWrapper {
      height: 400px;
    }
  }
  @media (max-width: 769px) {
    .cardWrapper {
      height: auto;
    }
  }



`

let BlogPosts = () => {


  let BlogPosts = useSelector((state => state.BlogPosts.PostsListOne))
  let isLoadingPosts = useSelector((state => state.BlogPosts.isLoadingPosts))
  let [newPostModal, setNewPostModal] = useState(false)
  const [successfullyPosted, setSuccessfullyPosted] = useState(false)
  const [postModal, setPostModal] = useState(false)
  let [postInfo, setPostInfo] = useState([])
  let [openRedaction, setOpenRedaction] = useState(false)
  let currentPage = useSelector((state => state.PaginationData.currentPage))
  let rowsPerPage = useSelector((state => state.PaginationData.rowsPerPage))
  let totalCount = useSelector((state => state.PaginationData.totalPages))



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
      RecordsPerPage: rowsPerPage,
      PageNumber: currentPage
    }))
  }, [currentPage, rowsPerPage])


  let handlePostModal = (post) => {
    setPostInfo(post)
    setPostModal(v => !v)
  }

  let handleRedacting = (e,post) => {
    e.stopPropagation()
    setPostInfo(post)
    setOpenRedaction(v => !v)
  }

  if (isLoadingPosts) {
    return <Preloader/>
  }

  return (
    <Styles>
      <Container fluid className="main-content-container px-4"
                 style={{marginBottom: '100px'}}
      >
        {/* Page Header */}
        <Row noGutters
             className="page-header py-4 d-flex justify-content-between">
          <PageTitle sm="4" title="პოსტები"
                     className="text-sm-left "/>
          <Button className={'btn-success'}
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

        <RedactionModal
          openRedaction={openRedaction}
          setOpenRedaction={setOpenRedaction}
          postValue={postInfo}
          setPostInfo = {setPostInfo}
        />

        {/* First Row of Posts */}
        <Row>
          <MyModal
            open={successfullyPosted}
            onClose={onSuccessfullyClosed}
            maxWidth={'sm'}
            title={'წარმატებულად დაიპოსტა'}
          />

          <PostModal
            postModal={postModal}
            handlePostModal={handlePostModal}
            postInfo={postInfo}
          />
          {BlogPosts && BlogPosts.map((post, idx) => {
            let str = post.body
            let start = str.indexOf('<p>')
            let end = str.indexOf('</p>')
            let bodyText = str.substring(start, end)

            return (
              <Col lg="3" md="6" sm="12" className="mb-4" key={idx}
                   style={{cursor: 'pointer'}}
                   onClick={() => handlePostModal(post)}
              >
                <Card small className="card-post card-post--1 cardWrapper"

                >
                  <div
                    className="card-post__image"
                    style={{backgroundImage: `url(${post.stringPhoto ? post.stringPhoto : defaultPostImg})`}}
                  >

                    <div className="card-post__author d-flex">
                      <Tooltip
                        title={post.author}
                      >
                        <a
                          href="#"
                          className="card-post__author-avatar card-post__author-avatar--small"
                          style={{backgroundImage: `url('${post.authorPhoto ? post.authorPhoto : defaultUser}')`}}
                        />

                      </Tooltip>

                    </div>
                  </div>
                  <CardBody>
                    <h6 className="card-title">
                      <a href="#" className="text-fiord-blue title">
                        {post.title}
                      </a>
                    </h6>
                    <div>
                      {
                      }
                      <ReactQuill
                        value={bodyText.length > 120 ? bodyText.slice(0, 110) + '...' : bodyText}
                        readOnly={true}
                        modules={Editor.mods}
                        className={'border-none'}

                      />
                    </div>


                  </CardBody>

                  <CardFooter className={'d-flex justify-content-between'}>
                               <span
                                 className="text-muted ">{post.datePublished.slice(0, 10)}
                               </span>
                    <span>
                               <i className="fas fa-pencil-alt"
                                  onClick={(e)=>{
                                    e.stopPropagation()
                                    setPostInfo(post)
                                    setOpenRedaction(true)
                                  }}
                               />
                         </span>
                  </CardFooter>
                </Card>
              </Col>
            )
          })
          }
        </Row>
        <Pagination
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage - 1}
        />

      </Container>
    </Styles>

  );

}
Editor.mods = {
  toolbar: false,
};
export default BlogPosts;
