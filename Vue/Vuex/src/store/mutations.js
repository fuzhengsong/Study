/**
 * Created by Administrator on 2017/4/19 0019.
 */
//import {add} from './types'
import * as types from './types'
import getters from './getters'

const state={
    count:20
};
const  mutations={
    [types.add](state){
        state.count++
    },
    [types.reduce](state){
        state.count--
    }

};
export default {
    state,
    mutations,
    getters
}