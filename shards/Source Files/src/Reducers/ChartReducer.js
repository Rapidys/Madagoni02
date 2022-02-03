import API from "../API/ApiBases";

let initialState = {
  isNewChartCreated: false,
  Charts: [],
  chosenChart: {},
  isChartsLoading: false,
}

let isNewChartCreated = 'IS-NEW-CHART'
let getCharts = 'GET-CHARTS'
let setChosenChart = 'SET-CHOSEN-CHART'
let setIsChartsLoading = 'setIsChartsLoading'

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
    case setIsChartsLoading:
      return {
        ...state,
        isChartsLoading: action.loading
      }
    default:
      return state
  }
}

export let isNewChartCreatedAC = (chart) => ({type: isNewChartCreated, chart})
export let getChartsAC = (chart) => ({type: getCharts, chart})
export let setChosenChartAC = (chart) => ({type: setChosenChart, chart})
export let setIsChartsLoadingAC = (loading) => ({
  type: setIsChartsLoading,
  loading
})

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
    dispatch(setIsChartsLoadingAC(true))

    try {
      API.getCharts(id, rowsPerPage).then(response => {
        dispatch(getChartsAC(response.data))
        dispatch(setIsChartsLoadingAC(false))
      })
    } catch (e) {
      console.log(e)
    }
  }
}
export let GetChart = (id) => {
  return dispatch => {
    dispatch(setIsChartsLoadingAC(true))

    try {
      API.getChart(id).then(response => {
        dispatch(setChosenChartAC(response.data))
        dispatch(setIsChartsLoadingAC(false))

      })
    } catch (e) {
      console.log(e)
    }
  }
}
