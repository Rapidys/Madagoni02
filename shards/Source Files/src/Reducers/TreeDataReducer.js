import API from "../API/ApiBase";

let initialState = {
  Structure: [],
  newStructure: []


}

const SetStructure = 'SETSTRUCTURE'
const setNewStructure = 'NEWSTRUCTURE'


let treeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SetStructure:
      return {
        ...state,
        Structure: action.structure
      }
    case setNewStructure:
      return {
        ...state,
        newStructure: action.newStructure
      }
    default:
      return state
  }
}

export let TreeDataAC = (structure) => ({type: SetStructure, structure})
export let setNewStructureAC = (newStructure) => ({type: setNewStructure, newStructure})


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
