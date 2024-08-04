import {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../router/index.jsx";
import {CarsContext} from "../context/index.js"
import {Spin} from "antd";

const AppRouter = () => {
    const {isLoading} = useContext(CarsContext);

    if (isLoading) {
        return <Spin size={"large"}/>
    }

    return (
        <Routes>
            {
                routes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.id}
                        exact={route.exact}/>
                ))
            }
        </Routes>
    );
};

export default AppRouter;