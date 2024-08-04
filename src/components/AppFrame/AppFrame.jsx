import { Layout, Menu, theme } from 'antd';
import {
    CarOutlined,
    SaveOutlined,
} from '@ant-design/icons'
import AppRouter from "../AppRouter.jsx";
import {useNavigate} from "react-router-dom";
import classes from "./AppFrame.module.css";
const { Header, Content } = Layout;

const AppFrame = () => {
    const items = [
        {
            key: 'cars',
            icon: <CarOutlined />,
            label: 'Cars',
        },
        {
            key: 'save',
            icon: <SaveOutlined />,
            label: 'Save',
        }
    ]

    const navigate = useNavigate();

    const changeLink = (e) => {
        navigate('/' + e.key);
        localStorage.setItem("page", e.key)
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className={classes.appFrame}>
            <Header
                className={classes.header}
            >
                <h2 style={{color: colorBgContainer}} className={classes.headerIcon}>CRUD</h2>
                <Menu
                    onClick={changeLink}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[localStorage.getItem("page")]}
                    items={items}
                    className={classes.headerMenu}
                />
            </Header>
            <Layout>
                <Layout
                    className={classes.contentLayout}
                >
                    <Content
                        className={classes.contentContainer}
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <AppRouter/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AppFrame;