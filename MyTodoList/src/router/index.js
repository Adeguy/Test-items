import {createBrowserRouter} from "react-router-dom";
import Login from "../module/Side_Functions/login"
import Mytodolist from "../Page_composition"
import Root from "./root"
const routes=[
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/mytodolist',
                element:<Mytodolist></Mytodolist>
            }
            ,
            {
                path:'/',
                element:<Login></Login>,
            }
        ]


    }
]
const router=createBrowserRouter(routes);
export default  router;