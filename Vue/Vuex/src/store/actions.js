/**
 * Created by Administrator on 2017/4/19 0019.
 */
import * as types from './types'

export default{
    add:({commit})=>{
        commit('ADD')
    },
    reduce:({commit})=>{
        commit(types.reduce)
    },
    even:({commit,state})=>{
        if(state.mutations.count%2===0){
            commit(types.add)}
    },
    anycadd:({commit})=>{
        new Promise((solve)=>{
            setTimeout(()=>{
                commit(types.add);
                solve()
            },1000)
        })
    }
}
