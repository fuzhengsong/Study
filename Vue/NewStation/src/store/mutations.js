/**
 * Created by Administrator on 2017/4/21 0021.
 */
import getters from './getters'
    const state = {
        headerStation: true,
        footerStation: true
    };

    const mutations={
        'headerHide'(state){
            state.headerStation = false
        },
        'headerShow'(state){
            state.headerStation = true;
        },
        'footerHide'(state){
            state.footerStation = false;
        },
        'footerShow'(state){
            state.footerStation = true;
        }
    };

    export default{
        state,
        mutations,
        getters
    }

