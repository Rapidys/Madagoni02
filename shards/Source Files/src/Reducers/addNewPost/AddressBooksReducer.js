import API from "../../API/ApiBase";

let initialState = {
  addressBook: [],
  addressBookId: 0,
  addressBookName: '',
  deleteBook: false,
  successModal: false,
}

let setBook = 'SET-ADDRESS-BOOK'
let setBookId = 'SET-ADDRESS-BOOK-ID'
let setBookName = 'SET-ADDRESS-BOOK-NAME'
let setDeleteBook = 'SET-DELETE-BOOK'
let setSuccessModal = 'SET-SUCCESS-MODAL'
let AddressBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case setBook :
      return {
        ...state,
        addressBook: action.payload
      }
    case setBookId :
      return {
        ...state,
        addressBookId: action.payload
      }
    case setBookName :
      return {
        ...state,
        addressBookName: action.payload
      }
    case setDeleteBook :
      return {
        ...state,
        deleteBook: action.payload
      }
    case setSuccessModal :
      return {
        ...state,
        successModal: state.successModal === false ? true : false
      }
    default:
      return state
  }
}

export let setAddressBookAC = (payload) => ({type: setBook, payload})
export let setBookIdAC = (payload) => ({type: setBookId, payload})
export let setBookNameAC = (payload) => ({type: setBookName, payload})
export let setDeleteBookAC = (payload) => ({type: setDeleteBook, payload})
export let setSuccessModalAC = (payload) => ({type: setSuccessModal, payload})

export default AddressBookReducer


export let getAddressBook = () => {
  return dispatch => {
    try {
      API.getAddressBook().then(response => {
        dispatch(setAddressBookAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export let updateAddressBook = (addressBook) => {
  return dispatch => {
    API.updateAddressBook(addressBook).then(response => {
      dispatch(getAddressBook())
      dispatch(setSuccessModalAC())
    })
  }
}
