import {Affix, Input, Layout, Pagination, Select, Space, Switch, theme, Typography} from "antd";
import {DownCircleOutlined, SearchOutlined, UpCircleOutlined} from "@ant-design/icons";
import {useContext, useEffect, useState} from "react";
import ListCars from "../../components/ListCars/ListCars.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import CarsApi from "../../api/CarsService.js";
import CarsService from "../../api/CarsService.js";
import {defaultPageNumber, pageSize} from "../../constants/index.js";
import {CarsContext} from "../../context/index.js";
import classes from "./CarsPage.module.css";

const {Sider, Content, Footer} = Layout

const CarsPage = () => {

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const orderByItems = [
        {label: "Producer", value: "producer"},
        {label: "Model", value: "model"},
        {label: "Engine Capacity", value: "engine_capacity"},
        {label: "Power", value: "power"},
        {label: "Images Count", value: "images_count"}
    ]

    const [cars, setCars] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const [desc, setDesc] = useState(false);
    const [page, setPage] = useState(defaultPageNumber);

    const [fetchCars, isCarsLoading,] = useFetching(async (filter) => {
        const response = await CarsApi.getCars(filter);
        setCars(response.data);

        await setTotalCount(response.headers['x-total-count'])
        console.log(response.headers['x-total-count'])
    })

    useEffect(() => {
        fetchCars({
            limit: pageSize,
            page: page,
            orderBy: orderBy,
            desc: desc,
            searchQuery: searchQuery,
        });
    }, [orderBy, desc, searchQuery, page]);

    const {messagesApi} = useContext(CarsContext)

    const updateFetching = () => {
        fetchCars({
            limit: pageSize,
            page: page,
            orderBy: orderBy,
            desc: desc,
            searchQuery: searchQuery,
        });
    }

    const deleteCar = (number) => {
        CarsService.deleteCar(number, messagesApi, updateFetching)
    }

    return (
        <>
            <Typography.Title>
                Our cars
            </Typography.Title>
            <Layout>
                <Sider
                    style={{background: colorBgContainer}}
                >
                    <Affix offsetTop={20}>
                        <Space
                            direction="vertical"
                        >
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                prefix={<SearchOutlined/>}
                            />

                            <Select
                                showSearch
                                placeholder="Order By"
                                options={orderByItems}
                                optionFilterProp="label"
                                onChange={value => setOrderBy(value)}
                                className={classes.fullWidth}
                            />

                            <Switch
                                checkedChildren={
                                    <Space>
                                        <DownCircleOutlined />
                                        Descending
                                        <DownCircleOutlined />
                                    </Space>
                                }
                                unCheckedChildren={
                                    <Space>
                                        <UpCircleOutlined />
                                        Ascending
                                        <UpCircleOutlined />
                                    </Space>
                                }
                                defaultChecked="desc"
                                onChange={() => setDesc(!desc)}
                            />
                        </Space>
                    </Affix>

                </Sider>
                <Layout>
                    <Content
                        className={classes.listCarsContainer}
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <ListCars
                            cars={cars}
                            isCarsLoading={isCarsLoading}
                            deleteCar={deleteCar}
                        />
                    </Content>
                    <Footer style={{backgroundColor: colorBgContainer}}>
                        <Pagination
                            align={"center"}
                            total={totalCount}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            onChange={value => setPage(value)}
                        />
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default CarsPage;