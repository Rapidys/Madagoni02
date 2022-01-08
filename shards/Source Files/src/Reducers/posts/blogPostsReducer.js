import API from "../../API/ApiBase";

let initialState = {
  PostsListOne: [
    {
      backgroundImage: '',
      category: "Business",
      categoryTheme: "dark",
      author: "Anna Kunis",
      authorAvatar: '',
      title: "Conduct at an replied removal an amongst",
      body:
        "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
      date: "28 February 2019"
    },
    {
      backgroundImage: '',
      category: "Travel",
      categoryTheme: "info",
      author: "James Jamerson",
      authorAvatar: '',
      title: "Off tears are day blind smile alone had ready",
      body:
        "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
      date: "29 February 2019"
    },
    {
      backgroundImage: '',
      category: "Technology",
      categoryTheme: "royal-blue",
      author: "Jimmy Jackson",
      authorAvatar: '',
      title: "Difficult in delivered extensive at direction",
      body:
        "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
      date: "29 February 2019"
    },
    {
      backgroundImage: '',
      category: "Business",
      categoryTheme: "warning",
      author: "John James",
      authorAvatar: '',
      title: "It so numerous if he may outlived disposal",
      body:
        "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
      date: "29 February 2019"
    }
  ],

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
        dispatch(setPostAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
