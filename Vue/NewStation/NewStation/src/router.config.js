/**
 * Created by Administrator on 2017/4/20 0020.
 */
import Home from './components/Home.vue'
import Article from './components/Article.vue'
import Column from './components/Column.vue'
import Userinfo from './components/Userinfo.vue'
import Reg from './components/Reg.vue'
import Login from './components/Login.vue'
import Follow from './components/Follow.vue'
export default[
        {path:'/home',component:Home,},
        {path:'/follow',component:Follow},
        {path:'/column',component:Column},
        {path:'/UserInfo',components:{zoomIn:Userinfo}},
        {path:'/user-reg',components:{zoomIn:Reg}},
        {path:'/user-login',components:{zoomIn:Login}},
        {path:'/article/:id',component:Article},
        {path:'*',redirect:'/home'}
    ]
