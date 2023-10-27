
import React from "react";

import { NavLink} from 'react-router-dom';
import {RouterProvider} from "react-router-dom";
import  router from './router'
function App() {
    return (
    <div >
      <RouterProvider router={router}/>
    </div>
);
}
export default App;


