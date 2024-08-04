import {Button, Flex, Image, Layout, Popconfirm, theme, Typography} from "antd";
import {DeleteOutlined, DoubleRightOutlined} from "@ant-design/icons";
import {emptyImage} from "../../constants/index.js";
import {useNavigate} from "react-router-dom";
import classes from "./CarItem.module.css";

const {Title, Paragraph} = Typography;
const {Sider, Content, Footer} = Layout;

const CarItem = ({car, deleteCar}) => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const navigate = useNavigate();
    const goToCarIdPage = () => {
        navigate("/cars/" + car.number);
    }

    return (
        <Layout
            className={classes.carItemContainer}
            style={{
                borderRadius: borderRadiusLG,
            }}
        >
            <Sider
                style={{background: colorBgContainer}}
            >
                <Image
                    width={200}
                    className={classes.carImage}
                    placeholder={"This is car image"}
                    fallback={emptyImage}
                    src={"http://localhost:8080/image?id=0&number=" + car.number}
                />
            </Sider>
            <Layout
                className={classes.carItemContentContainer}
            >
                <Content>
                    <Typography>
                        <Title>{car.producer} {car.model}</Title>
                        <Paragraph ellipsis={{rows: 4}}>
                            {car.description}
                        </Paragraph>
                    </Typography>
                </Content>
                <Footer
                    className={classes.carItemContentFooter}
                >
                    <Flex direction="row" justify="space-between">
                        <Button
                            type={"primary"}
                            icon={<DoubleRightOutlined/>}
                            onClick={goToCarIdPage}
                        >
                            Go to
                        </Button>

                        <h2>
                            {car.number}
                        </h2>

                        <Popconfirm
                            placement={"topRight"}
                            title={"Delete the car"}
                            description={"are you sure you want to delete this car?"}
                            okText="Yes, delete it!"
                            cancelText={"No, don't touch!"}
                            onConfirm={() => {deleteCar(car.number)}}
                        >
                            <Button type={"default"} danger icon={<DeleteOutlined/>}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Flex>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CarItem;