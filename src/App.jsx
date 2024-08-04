import {CarsContext} from "./context/index.js";
import {useState} from "react";
import AppFrame from "./components/AppFrame/AppFrame.jsx";
import {BrowserRouter} from "react-router-dom";
import {message} from "antd";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()

    return (
        <CarsContext.Provider value={{
            isLoading,
            setIsLoading,
            messageApi,
        }}>
            {contextHolder}
            <BrowserRouter>
                <AppFrame/>
            </BrowserRouter>
        </CarsContext.Provider>
    );
};
export default App;