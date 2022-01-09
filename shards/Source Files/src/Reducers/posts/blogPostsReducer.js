import API from "../../API/ApiBase";

let initialState = {
  PostsListOne: []

  // Second list of posts.

}

let setPosts = 'SET-BLOG-POSTS'

let BlogPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case setPosts:
      return {
        ...state,
        PostsListOne: action.post
      }
    default:
      return state
  }
}

export let setPostAC = (post) => ({type: setPosts, post})

export default BlogPostsReducer


export let getPosts = (post) => {
  return dispatch => {
    try {
      debugger
      API.getPosts(post).then(response => {
        console.log(response)
        dispatch(setPostAC(response.data.posts))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
