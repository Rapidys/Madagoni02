import API from "../API/ApiBase";

let initialState = {
  Structure: [],


}

const SetStructure = 'SETSTRUCTURE'

let treeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SetStructure:
      return {
        ...state,
        Structure: action.structure
      }

    default:
      return state
  }
}

export let TreeDataAC = (structure) => ({type: SetStructure, structure})


export default treeDataReducer

export let TreeData = () => {
  return dispatch => {
    try {
      API.GetStructure().then(response => {
        dispatch(TreeDataAC(response.data))


      })
    } catch (e) {
      console.log(e)
    }


  }
}
