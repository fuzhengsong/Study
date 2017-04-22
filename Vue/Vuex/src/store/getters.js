/**
 * Created by Administrator on 2017/4/19 0019.
 */
export default {
    count(state){
        return state.count
    },
    isOdd(state){
        return state.count%2===0?'偶数':'奇数'
    }
}