import {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Layout, theme} from "antd";
import classes from "./CarIdPage.module.css";
import ImagesCarousel from "../../components/ImagesCarousel/ImagesCarousel.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import CarsService from "../../api/CarsService.js";
import CarDescription from "../../components/CarDescription/CarDescription.jsx";
import {getImagesArr} from "../../utils/images.js";
import {CarsContext} from "../../context/index.js";

const {Sider, Content} = Layout;

const CarIdPage = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const {number} = useParams()

    const [car, setCar] = useState({});
    const [images, setImages] = useState([])

    const [fetchCar, isCarLoading] = useFetching(async (number) => {
        const response = await CarsService.getCar(number);
        setCar(response.data);
    })

    useEffect(() => {
        fetchCar(number)
    }, [number])

    useEffect(() => {
        setImages(getImagesArr(car.number, car.images_count))
    },[car])

    const {messageApi} = useContext(CarsContext)

    const updateFetch = () => {
        fetchCar(number)
    }

    const onSubmit = async (formData) => {
        await CarsService.updateCar(formData, messageApi, updateFetch)
    }

    return (
        <>
            <Layout>
                <Sider
                    width={600}
                    style={{background: colorBgContainer}}
                >
                    <ImagesCarousel
                        images={images}
                        isLoading={isCarLoading}
                    />
                </Sider>
                <Content
                    className={classes.content}
                    style={{background: colorBgContainer}}
                >
                    <CarDescription car={car} onSubmit={onSubmit}/>
                </Content>
            </Layout>
        </>
    );
};

export default CarIdPage;