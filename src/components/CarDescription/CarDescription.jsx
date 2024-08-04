import {useState} from 'react';
import {Button, Descriptions, Modal, Space, Spin, Typography} from "antd";
import CarForm from "../CarForm/CarForm.jsx";
import CarsService from "../../api/CarsService.js";
import classes from "./CarDescription.module.css"

const {Paragraph} = Typography

const CarDescription = ({car, onSubmit}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [images, setImages] = useState([[]])

    if (!car.producer) {
        return (
            <Space
                direction={"vertical"}
                align={"center"}
                className={classes.spin}
            >
                <Spin size={"large"}/>
            </Space>
        )
    }

    const items = [
        {
            key: 1,
            label: "Producer",
            children: car.producer,
        },
        {
            key: 2,
            label: "Model",
            children: car.model,
        },
        {
            key: 3,
            label: "Power",
            children: car.power,
        },
        {
            key: 4,
            label: "Engine Capacity",
            children: car.engine_capacity,
        },
        {
            key: 5,
            label: "Number",
            children: car.number,
        },
        {
            key: 6,
            label: "Description",
            children: (
                <Paragraph

                    ellipsis={{
                        expandable: true,
                        rows: 5,
                        symbol: 'more',
                    }}
                >
                    {car.description}
                </Paragraph>
            ),
        }
    ]
    const openModal = async () => {
        const imgsArr = await CarsService.getImages(car.number)
        let imgsItems = []
        for (let i = 0; i < imgsArr.length; i++) {
            const name = "image" + i + ".png";
            let response = await fetch(imgsArr[i]);
            let data = await response.blob();
            let file = new File([data], name, {
                type: 'image/png'
            });
            imgsItems.push({
                uid: i,
                name: name,
                status: "done",
                url: imgsArr[i],
                originFileObj: file
            })
        }
        setImages(imgsItems)
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Descriptions
                column={1}
                bordered items={items}
                title={car.producer + " " + car.model}
                extra={
                    <Button
                        onClick={openModal}
                        type={"primary"}
                    >
                        Edit
                    </Button>
                }
            />
            <Modal
                title={"Edit Car"}
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
                footer={null}
            >
                <CarForm
                    onSubmit={onSubmit}
                    car={car}
                    images={images}
                />
            </Modal>
        </>
    );
};

export default CarDescription;