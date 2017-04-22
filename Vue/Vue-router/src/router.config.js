/**
 * Created by Administrator on 2017/4/17 0017.
 */
//配置路由
//需要3个模板 news home users
import Home from './Home.vue'
import News from './News.vue'
import Users from './Users.vue'
import Username from './Username.vue'
import UserInfo from './UserInfo.vue'

export default {
    routes:[
        {path:'/Home',component:Home},
        {path:'/News',component:News},
        {path:'/Users',component:Users,
        children:[
            {path:'username',component:Username},
            {path:':name/age/:age',component:UserInfo},
            {path:':name/age/:age',component:UserInfo},
            {path:':name/age/:age',component:UserInfo}
        ]}
    ]
}