import API from "../../API/ApiBase";

let initialState = {
  PostsListOne: [],
  isLoadingPosts: false,
  // Second list of posts.

}

let setPosts = 'SET-BLOG-POSTS'
let isLoadingPosts = 'LOADING-POSTS'

let BlogPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case setPosts:
      return {
        ...state,
        PostsListOne: action.post
      }
    case isLoadingPosts:
      return {
        ...state,
        isLoadingPosts: action.loading
      }
    default:
      return state
  }
}

export let setPostAC = (post) => ({type: setPosts, post})
export let isLoadingPostsAC = (loading) => ({type: isLoadingPosts, loading})

export default BlogPostsReducer


export let getPosts = (post) => {
  return dispatch => {
    dispatch(isLoadingPostsAC(true))
    try {
      API.getPosts(post).then(response => {
        dispatch(setPostAC(response.data.posts))
        dispatch(isLoadingPostsAC(false))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
