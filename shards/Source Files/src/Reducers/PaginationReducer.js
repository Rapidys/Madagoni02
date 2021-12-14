let initialState = {
  currentPage: 1,
  rowsPerPage: 10,
  totalPages: null,
}


let setCurrentPage = 'CURRENT-PAGE'
let setTotal = 'SET-TOTAL'
let setLimit = 'set-limit'

let PaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case setCurrentPage: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case setLimit: {
      return {
        ...state,
        rowsPerPage: action.limit
      }
    }
    case setTotal: {
      return {
        ...state,
        totalPages: action.total
      }
    }
    default:
      return state
  }
}

export let rowsPerPageAc = (limit) => ({type: setLimit, limit})
export let setToTalPages = (total) => ({type: setTotal, total})
export let setCurrentPageAC = (currentPage) => ({
  type: setCurrentPage,
  currentPage
})


export default PaginationReducer
