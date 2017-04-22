/**
 * Created by Administrator on 2017/4/19 0019.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const actions={
    add:({commit})=>{
        commit('add');
    },
    reduce:({commit})=>{
        commit('down')
    },
    even:({commit,state})=>{
        if(state.count%2===0) {
            commit('add')
        }
    },
    anycadd:({commit})=>{
        setTimeout(()=>{
            commit('add')
        },1000)
    }
};
const state={
    count:10
};
const mutations={
    add:(state)=>{
        state.count++
    },
    down(state){
        state.count--
    }
};
const getters={
  count(){
      return state.count
  }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})