let initialState = {
  currentMessagePage: {},
  uniqueId: null,
  newDocs: [],
  isLoading: false,
}

let chosenDocPage = 'chosenDocPage'
let uniqueId = 'uniqueId'
let setNewDocs = 'setNewDocs'
let chosenLoading = 'chosenLoading'


let chosenDocumentReducer = (state = initialState, action) => {
  switch (action.type) {

    case chosenDocPage: {
      return {
        ...state,
        currentMessagePage: action.info
      }
    }
    case uniqueId: {

      return {
        ...state,
        uniqueId: action.id
      }
    }
    case setNewDocs: {

      return {
        ...state,
        newDocs: [...state.newDocs, ...action.newd]
      }
    }
    case chosenLoading: {

      return {
        ...state,
        isLoading: action.loading
      }
    }


    default:
      return state
  }
}

export let chosenDocPageAC = (info) => ({type: chosenDocPage, info})
export let uniqueIdAC = (id) => ({type: uniqueId, id})
export let newDocs = (newd) => ({type: setNewDocs, newd})
export let chosenIsLoadingAC = (loading) => ({type: chosenLoading, loading})


export default chosenDocumentReducer
