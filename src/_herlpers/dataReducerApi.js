

export const initialState = {
    dataListApi: [],
    errorDataApi: false,
    loadingData: true,
  }
  
export function reducer(state, action) {
    //console.log("gg: ")
  
    //console.log(action.type)
  
    switch(action.type) {
      case 'GET_API_DATA':
        return {
          ...state,
          dataListApi: action.payload,
          errorDataApi: false,
          loadingData: false,
        }
      case 'ERROR_API_DATA':
        return {
          ...state,
          errorDataApi: true,
          loadingData: false,
        }
      case 'LOADING_API_DATA':
        return {
          ...state,
          loadingData: false,
        }
  
      case 'SEARCH_API_DATA':
        return {
          ...state,
          dataListApi: action.payload,
          errorDataApi: false,
          loadingData: false,
        }
  
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }