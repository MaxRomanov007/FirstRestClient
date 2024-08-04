import {Empty, Space, Spin} from "antd";
import CarItem from "../CarItem/CarItem.jsx";
import {useMemo} from "react";
import classes from "./ListCars.module.css";

const ListCars = ({cars, isCarsLoading, deleteCar}) => {
    cars = useMemo(() => cars, [cars]);

    if (!cars) {
        return(
            <Space
                className={classes.fullWidth}
                direction="vertical"
                align="center"
            >
                <Empty/>
            </Space>
        )
    }

    if (isCarsLoading) {
        return (
            <Space
                className={classes.fullWidth}
                direction="vertical"
                align="center"
            >
                <Spin size="large"/>
            </Space>

        )
    }

    return (
        <Space
            className={classes.fullWidth}
            direction="vertical"
            align="center"
        >
            {cars.map((car) => (
                <CarItem key={car.number} car={car} deleteCar={deleteCar}/>
            ))}
        </Space>
    );
};

export default ListCars;