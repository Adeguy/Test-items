import React from "react";
import { RouterProvider } from "react-router-dom";
import router from './router';

class App extends React.Component {
    render() {
        return (
            <div>
                <RouterProvider router={router} />
            </div>
        );
    }
}

export default App;