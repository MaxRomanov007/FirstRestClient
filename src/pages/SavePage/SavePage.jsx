import {useContext} from 'react';
import {Space} from "antd";
import CarForm from "../../components/CarForm/CarForm.jsx";
import {CarsContext} from "../../context/index.js";
import CarsService from "../../api/CarsService.js";
import classes from "./SavePage.module.css"

const SavePage = () => {
    const {messageApi} = useContext(CarsContext)

    const onSubmit = async (formData) => {
        await CarsService.saveCar(formData, messageApi)
    }

    return (
        <>
            <Space align={"center"} direction={"vertical"} className={classes.fullWidth}>
                <CarForm onSubmit={onSubmit}/>
            </Space>
        </>
    );
};

export default SavePage;