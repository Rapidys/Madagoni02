import API from "../API/ApiBase";

let initialState = {
  Structure: [],


}

const SetStructure = 'SETSTRUCTURE'
const SetChoosenValue = 'ChoosenValue'

let treeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SetStructure:
      return {
        ...state,
        Structure: action.structure
      }
    case SetChoosenValue :
      return {
        ...state,
        ChoosenValue: state.ChoosenValue = action.newVal
      }
    default:
      return state
  }
}

export let TreeDataAC = (structure) => ({type: SetStructure, structure})
export let setChoosenValueAC = (newVal) => ({type: SetChoosenValue, newVal})


export default treeDataReducer

export let TreeData = () => {
  return dispatch => {
    try {
      API.GetStructure().then(response => {
        if (response.status === 200) {
          dispatch(TreeDataAC(response.data))
          console.log(response.data)
        }

      })
    } catch (e) {
      console.log(e)
    }


  }
}
