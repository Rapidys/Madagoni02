import API from "../API/ApiBase";

let initialState = {
  isNewChartCreated: false,
  Charts: [],
  chosenChart: {},
}

let isNewChartCreated = 'IS-NEW-CHART'
let getCharts = 'GET-CHARTS'
let setChosenChart = 'SET-CHOSEN-CHART'

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
    case setChosenChart:
      return {
        ...state,
        chosenChart: action.chart
      }
    default:
      return state
  }
}

export let isNewChartCreatedAC = (chart) => ({type: isNewChartCreated, chart})
export let getChartsAC = (chart) => ({type: getCharts, chart})
export let setChosenChartAC = (chart) => ({type: setChosenChart, chart})

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
        dispatch(getChartsAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
export let GetChart = (id) => {
  return dispatch => {
    try {
      API.getChart(id).then(response => {
        debugger
        dispatch(setChosenChartAC(response.data))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
