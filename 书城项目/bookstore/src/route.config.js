/**
 * Created by Administrator on 2017/4/26 0026.
 */
import Home from './components/Home.vue';
import Reader from './components/reader.vue'
import Book from './components/book.vue'
import Male from './components/male.vue'
import Female from './components/female.vue'
import Catagory from './components/catagory.vue'
import Rank from './components/rank.vue'
import BookStore from './components/bookStore.vue'
export  default [
    {path:'/',component:Home},
    {path:'/home',component:Home},
    {path:'/male',component:Male},
    {path:'/female',component:Female},
    {path:'/catagory',component:Catagory},
    {path:'/rank',component:Rank},
    {path:'/bookStore',component:BookStore},
    {path:'/book/:id',name:'book',component:Book},
    {path:'/reader',component:Reader},
    {path:'*',redirect:'/home'}
]



