import {Button, Form, Input, InputNumber, Space} from "antd";
import DragAndDrop from "../DragAndDrop/DragAndDrop.jsx";
import {useEffect} from "react";
import classes from "./CarForm.module.css";

const {TextArea} = Input

const CarForm = ({onSubmit, car = {}, images = []}) => {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        const formData = new FormData()
        values.images.fileList.map((file) => {
            formData.append("images", file.originFileObj)
        })
        formData.append("body", JSON.stringify({
            producer: values.producer,
            model: values.model,
            engine_capacity: values.engine_capacity,
            power: values.power,
            number: values.number,
            description: values.description,
        }))

        await onSubmit(formData)
    }

    const checkFileList = (_, value) => {
        if (value.fileList.length < 1) {
            return Promise.reject(new Error("There are no one image"))
        }
        if (value.fileList.length > 15) {
            return Promise.reject(new Error("There are too many images (max 15)"))
        }
        return Promise.resolve()
    }

    return (
        <Form
            onFinish={onFinish}
            form={form}
            layout={"vertical"}
            labelWrap
            requiredMark={false}
            initialValues={{
                number: car.number,
                producer: car.producer,
                model: car.model,
                description: car.description,
                power: car.power,
                engine_capacity: car.engine_capacity,
                images: images
            }}
        >
            <Form.Item
                className={classes.inlineFormItemContainer}
            >
                <Form.Item
                    className={classes.inlineFormItemLeft}
                    label={"Producer"}
                    name={"producer"}
                    rules={[
                        {
                            required: true,
                            message: "Input producer please"
                        }
                    ]}
                >
                    <Input
                        placeholder={"Producer"}
                    />
                </Form.Item>
                <Form.Item
                    className={classes.inlineFormItemRight}
                    label={"Model"}
                    name={"model"}
                    rules={[
                        {
                            required: true,
                            message: "Input model please"
                        }
                    ]}
                >
                    <Input
                        placeholder={"Model"}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item
                className={classes.inlineFormItemContainer}
            >
                <Form.Item
                    className={classes.inlineFormItemLeft}
                    label={"Power"}
                    name={"power"}
                    rules={[
                        {
                            required: true,
                            message: "Input power please"
                        }
                    ]}
                >
                    <InputNumber
                        placeholder={"Power"}
                        min={0}
                        style={{width: "100%"}}
                        changeOnWheel
                    />
                </Form.Item>
                <Form.Item
                    className={classes.inlineFormItemRight}
                    label={"Engine Capacity"}
                    name={"engine_capacity"}
                    rules={[
                        {
                            required: true,
                            message: "Input engine capacity please"
                        }
                    ]}
                >
                    <InputNumber
                        placeholder={"Engine Capacity"}
                        min={0}
                        className={classes.fullWidth}
                        changeOnWheel
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item
                layout={"horizontal"}
                className={classes.inlineFormItemLeft}
                label={"Number"}
                name={"number"}
                rules={[
                    {
                        required: true,
                        message: "Input number please"
                    },
                    {
                        pattern: `^[ABEKMHOPCTYXabekmhopctyxАВЕКМНОРСТУХавекмнорстух][0-9]{3}[ABEKMHOPCTYXabekmhopctyxАВЕКМНОРСТУХавекмнорстух]{2}$`,
                        message: "not valid number"
                    }
                ]}
            >
                <Input
                    placeholder={"Licence plate"}
                />
            </Form.Item>
            <Form.Item
                label={"Description"}
                name={"description"}
            >
                <TextArea
                    autoSize={{minRows: 3, maxRows: 5}}
                />
            </Form.Item>
            <Form.Item
                validateFirst
                label={"Images"}
                name={"images"}
                rules={[
                    {
                        validator: checkFileList
                    }
                ]}
            >
                <DragAndDrop/>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="reset">
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default CarForm;