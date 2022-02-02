let initialState = {
  mainInfo: false,
  attachedFiles: false,
  visitors: false,
  Authors: false,
  addresants: false,
  comments: false,
}
let SetMainInfo = 'MAIN-INFO'
let SetAttachFiles = 'ATTACHED-FILES'
let SetVisitors = 'VISITORS'
let setAuthors = 'AUTHORS'
let setAddresants = 'ADDRESANTS'
let setComments = 'COMMENTS'

let sideBarActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SetMainInfo :
      return {
        ...state,
        mainInfo: action.main
      }
    case SetAttachFiles: {
      return {
        ...state,
        attachedFiles: action.attached
      }
    }
    case SetVisitors: {
      return {
        ...state,
        visitors: action.visitors
      }
    }
    case setAuthors: {
      return {
        ...state,
        Authors: action.Authors
      }
    }
    case setAddresants: {
      return {
        ...state,
        addresants: action.addresants
      }
    }
    case setComments: {
      return {
        ...state,
        comments: action.comments
      }
    }
    default:
      return state
  }
}

export let MainInfoAC = (main) => ({type: SetMainInfo, main})
export let SetAttachFilesAC = (attached) => ({type: SetAttachFiles, attached})
export let SetVisitorsAC = (visitors) => ({type: SetVisitors, visitors})
export let setAuthorsAC = (Authors) => ({type: setAuthors, Authors})
export let setAddresantsAC = (addresants) => ({type: setAddresants, addresants})
export let setCommentsAC = (comments) => ({type: setComments, comments})

export default sideBarActionsReducer
