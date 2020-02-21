import {apiBaseUrl} from './../Utils/Constants';
import {FETCHING_COIN_DATA, FETCHING_COIN_DATA_SUCCESS, FETCHING_COIN_DATA_FAIL} from './../Utils/ActionTypes';

export default function FetchCoinData() {
    return dispatch => {
        dispatch({type: FETCHING_COIN_DATA})
        const axios = require('axios');
        return axios.get(`${apiBaseUrl}`, {
            headers:{'X-CMC_PRO_API_KEY': '124719d2-6d52-48a9-8050-39268e2a510d'},
            params:{
                limit: 10
            }
        })
        .then(res =>{
            return dispatch({type: FETCHING_COIN_DATA_SUCCESS, payload: res.data})
        })
        .catch(err => {
            return dispatch({type: FETCHING_COIN_DATA_FAIL, payload: err})
        })
    }
}