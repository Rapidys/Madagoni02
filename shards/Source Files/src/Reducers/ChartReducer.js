import API from "../API/ApiBase";

let initialState = {
  isNewChartCreated: false,
  Charts: []
}

let isNewChartCreated = 'IS-NEW-CHART'
let getCharts = 'GET-CHARTS'

let ChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case isNewChartCreated:
      return {
        ...state,
        newChart: action.chart
      }
    case getCharts:
      return {
        ...state,
        Charts: action.chart
      }
    default:
      return state
  }
}

export let isNewChartCreatedAC = (chart) => ({type: isNewChartCreated, chart})
export let getChartsAC = (chart) => ({type: getCharts, chart})

export default ChartReducer

export let CreateNewChart = (newChart) => {
  return dispatch => {
    try {
      API.CreateChart(newChart).then(response => {
        dispatch(isNewChartCreatedAC(true))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
export let GetCharts = (id, rowsPerPage) => {
  return dispatch => {
    try {
      API.getCharts(id, rowsPerPage).then(response => {
        debugger
        dispatch(getChartsAC(response.data))
        console.log(response)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
