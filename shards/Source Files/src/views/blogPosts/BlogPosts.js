/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, {useState} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import {useSelector} from "react-redux";
import BlogModal from "./blogModal/blogModal";

let BlogPosts = () => {

  let BlogPosts = useSelector((state => state.BlogPosts))
  const PostsListOne = BlogPosts.PostsListOne
  const PostsListTwo = BlogPosts.PostsListTwo
  const PostsListThree = BlogPosts.PostsListThree
  const PostsListFour = BlogPosts.PostsListFour

  let [newPostModal, setNewPostModal] = useState(false)

  let onNewPostClose = () => {
    setNewPostModal(e => !e)
  }

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
          onNewPostClose = {onNewPostClose}
          newPostModal = {newPostModal}

        />
      </Row>

      {/* First Row of Posts */}
      <Row>
        {PostsListOne.map((post, idx) => (
          <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--1">
              <div
                className="card-post__image"
                style={{backgroundImage: `url(${post.backgroundImage})`}}
              >
                <Badge
                  pill
                  className={`card-post__category bg-${post.categoryTheme}`}
                >
                  {post.category}
                </Badge>
                <div className="card-post__author d-flex">
                  <a
                    href="#"
                    className="card-post__author-avatar card-post__author-avatar--small"
                    style={{backgroundImage: `url('${post.authorAvatar}')`}}
                  >
                    Written by {post.author}
                  </a>
                </div>
              </div>
              <CardBody>
                <h5 className="card-title">
                  <a href="#" className="text-fiord-blue">
                    {post.title}
                  </a>
                </h5>
                <p className="card-text d-inline-block mb-3">{post.body}</p>
                <span className="text-muted">{post.date}</span>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Second Row of Posts */}
      {/*<Row>*/}
      {/*  {PostsListTwo.map((post, idx) => (*/}
      {/*    <Col lg="6" sm="12" className="mb-4" key={idx}>*/}
      {/*      <Card small className="card-post card-post--aside card-post--1">*/}
      {/*        <div*/}
      {/*          className="card-post__image"*/}
      {/*          style={{backgroundImage: `url('${post.backgroundImage}')`}}*/}
      {/*        >*/}
      {/*          <Badge*/}
      {/*            pill*/}
      {/*            className={`card-post__category bg-${post.categoryTheme}`}*/}
      {/*          >*/}
      {/*            {post.category}*/}
      {/*          </Badge>*/}
      {/*          <div className="card-post__author d-flex">*/}
      {/*            <a*/}
      {/*              href="#"*/}
      {/*              className="card-post__author-avatar card-post__author-avatar--small"*/}
      {/*              style={{backgroundImage: `url('${post.authorAvatar}')`}}*/}
      {/*            >*/}
      {/*              Written by Anna Ken*/}
      {/*            </a>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <CardBody>*/}
      {/*          <h5 className="card-title">*/}
      {/*            <a className="text-fiord-blue" href="#">*/}
      {/*              {post.title}*/}
      {/*            </a>*/}
      {/*          </h5>*/}
      {/*          <p className="card-text d-inline-block mb-3">{post.body}</p>*/}
      {/*          <span className="text-muted">{post.date}</span>*/}
      {/*        </CardBody>*/}
      {/*      </Card>*/}
      {/*    </Col>*/}
      {/*  ))}*/}
      {/*</Row>*/}

      {/*/!* Third Row of Posts *!/*/}
      {/*<Row>*/}
      {/*  {PostsListThree.map((post, idx) => (*/}
      {/*    <Col lg="4" key={idx}>*/}
      {/*      <Card small className="card-post mb-4">*/}
      {/*        <CardBody>*/}
      {/*          <h5 className="card-title">{post.title}</h5>*/}
      {/*          <p className="card-text text-muted">{post.body}</p>*/}
      {/*        </CardBody>*/}
      {/*        <CardFooter className="border-top d-flex">*/}
      {/*          <div className="card-post__author d-flex">*/}
      {/*            <a*/}
      {/*              href="#"*/}
      {/*              className="card-post__author-avatar card-post__author-avatar--small"*/}
      {/*              style={{backgroundImage: `url('${post.authorAvatar}')`}}*/}
      {/*            >*/}
      {/*              Written by James Khan*/}
      {/*            </a>*/}
      {/*            <div*/}
      {/*              className="d-flex flex-column justify-content-center ml-3">*/}
      {/*                <span className="card-post__author-name">*/}
      {/*                  {post.author}*/}
      {/*                </span>*/}
      {/*              <small className="text-muted">{post.date}</small>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*          <div className="my-auto ml-auto">*/}
      {/*            <Button size="sm" theme="white">*/}
      {/*              <i className="far fa-bookmark mr-1"/> Bookmark*/}
      {/*            </Button>*/}
      {/*          </div>*/}
      {/*        </CardFooter>*/}
      {/*      </Card>*/}
      {/*    </Col>*/}
      {/*  ))}*/}
      {/*</Row>*/}

      {/*/!* Fourth Row of posts *!/*/}
      {/*<Row>*/}
      {/*  {PostsListFour.map((post, idx) => (*/}
      {/*    <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>*/}
      {/*      <Card small className="card-post h-100">*/}
      {/*        <div*/}
      {/*          className="card-post__image"*/}
      {/*          style={{backgroundImage: `url('${post.backgroundImage}')`}}*/}
      {/*        />*/}
      {/*        <CardBody>*/}
      {/*          <h5 className="card-title">*/}
      {/*            <a className="text-fiord-blue" href="#">*/}
      {/*              {post.title}*/}
      {/*            </a>*/}
      {/*          </h5>*/}
      {/*          <p className="card-text">{post.body}</p>*/}
      {/*        </CardBody>*/}
      {/*        <CardFooter className="text-muted border-top py-3">*/}
      {/*            <span className="d-inline-block">*/}
      {/*              By*/}
      {/*              <a className="text-fiord-blue" href={post.authorUrl}>*/}
      {/*                {post.author}*/}
      {/*              </a>{" "}*/}
      {/*              in*/}
      {/*              <a className="text-fiord-blue" href={post.categoryUrl}>*/}
      {/*                {post.category}*/}
      {/*              </a>*/}
      {/*            </span>*/}
      {/*        </CardFooter>*/}
      {/*      </Card>*/}
      {/*    </Col>*/}
      {/*  ))}*/}
      {/*</Row>*/}
    </Container>
  );

}

export default BlogPosts;
