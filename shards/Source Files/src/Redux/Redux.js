import {applyMiddleware, combineReducers, createStore} from "redux";
import sideBarReducer from "../Reducers/sideBarReducer";
import AuthReducer from "../Reducers/AuthReducer";
import thunk from "redux-thunk";
import {addNewPostReducer} from "../Reducers/addNewPost/addNewPostReducer";
import {setNewUser} from "../Reducers/registerReducer";
import treeDataReducer from "../Reducers/TreeDataReducer";
import DocumentMotionsReducer
  from "../Reducers/addNewPost/DocumentMotionsReducer";
import selectDocumentReducer from "../Reducers/addNewPost/selectDocReducer";
import uploadFileReducer from "../Reducers/addNewPost/UploadFileReducer";
import userInfoReducer from "../Reducers/userInfoReducer";
import PaginationReducer from "../Reducers/PaginationReducer";
import chosenDocumentReducer from "../Reducers/chosenDocumentReducer";
import MotionStatusReducer from "../Reducers/MotionStatusReducer";
import documentColorReducer from "../Reducers/setDocumentColorReducer";
import folderCounterReducer from "../Reducers/folderCountersReducer";
import commentsReducer from "../Reducers/Comments/CommentsReducer";
import creatNewCommentReducer
  from "../Reducers/Comments/CreateNewCommentReducer";
import GetDocReducer from "../Reducers/getDocReducer";
import notificationReducer from "../Reducers/notificationReducer";
import BlogPostsReducer from "../Reducers/posts/blogPostsReducer";


let Reducers = combineReducers({
  sideBarNavigation: sideBarReducer,
  Auth: AuthReducer,
  GetDoc: GetDocReducer,
  chosenDocument: chosenDocumentReducer,
  PaginationData: PaginationReducer,
  addNewPost: addNewPostReducer,
  Register: setNewUser,
  Tree: treeDataReducer,
  docMotion: DocumentMotionsReducer,
  selectDocument: selectDocumentReducer,
  uploadFile: uploadFileReducer,
  userInfo: userInfoReducer,
  MotionStatus: MotionStatusReducer,
  documentColor: documentColorReducer,
  folderCounter: folderCounterReducer,
  getComments: commentsReducer,
  creatNewComment: creatNewCommentReducer,
  getNotifications: notificationReducer,
  BlogPosts :BlogPostsReducer,
})

let store = createStore(Reducers, applyMiddleware(thunk))


export default store
