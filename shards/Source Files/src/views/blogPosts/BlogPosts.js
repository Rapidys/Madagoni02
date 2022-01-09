/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, {useEffect, useState} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import BlogModal from "./blogModal/blogModal";
import {getPosts} from "../../Reducers/posts/blogPostsReducer";


let BlogPosts = () => {

  let BlogPosts = useSelector((state => state.BlogPosts.PostsListOne))

  let [newPostModal, setNewPostModal] = useState(false)

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
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters
           className="page-header py-4 d-flex justify-content-between">
        <PageTitle sm="4" title="პოსტები"
                   className="text-sm-left "/>
        <Button className={'btn-info'}
                onClick={onNewPostClose}
        >
          პოსტის დამატება
        </Button>
        <BlogModal
          onNewPostClose={onNewPostClose}
          newPostModal={newPostModal}

        />
      </Row>

      {/* First Row of Posts */}
      <Row>
        {BlogPosts && BlogPosts.map((post, idx) => (
          <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--1">
              <div
                className="card-post__image"
                style={{backgroundImage: `url(${post.stringPhoto ? post.stringPhoto : post.backgroundImage})`}}
              >
                {/*<Badge*/}
                {/*  pill*/}
                {/*  // className={`card-post__category bg-${post.categoryTheme}`}*/}
                {/*>*/}
                {/*  {post.category}*/}
                {/*</Badge>*/}
                <div className="card-post__author d-flex">
                  <a
                    href="#"
                    className="card-post__author-avatar card-post__author-avatar--small"
                    style={{backgroundImage: `url('${post.authorPhoto ? post.authorPhoto : post.authorAvatar}')`}}
                  >
                    Written by {post.author}
                  </a>
                </div>
              </div>
              <CardBody style ={{minHeight:'200px'}}>
                <h5 className="card-title">
                  <a href="#" className="text-fiord-blue">
                    {post.title}
                  </a>
                </h5>
                <div>
                  <p className="card-text mb-3">
                    {post.body.slice(0,120)}
                  </p>
                </div>


                <span className="text-muted">{post.datePublished.slice(0,10)}</span>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );

}

export default BlogPosts;
