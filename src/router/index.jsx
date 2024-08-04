import CarsPage from "../pages/cars/CarsPage.jsx";
import CarIdPage from "../pages/CarIdPage/CarIdPage.jsx";
import SavePage from "../pages/SavePage/SavePage.jsx";
import {Navigate} from "react-router-dom";

export const routes = [
    {id: 1, path:"/cars", element: <CarsPage/>, exact: false},
    {id: 2, path:"/cars/:number", element: <CarIdPage/>, exact: false},
    {id: 3, path:"/save", element: <SavePage/>, exact: false},
    {id: 4, path:"*", element: <Navigate to="./cars" replace/>, exact: false},
]