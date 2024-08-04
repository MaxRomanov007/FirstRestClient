import {useEffect, useRef, useState} from 'react';
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DraggableUploadListItem from "../DraggableUploadListItem/DraggableUploadListItem.jsx";
import {DndContext, PointerSensor, useSensor} from "@dnd-kit/core"
import {InboxOutlined} from "@ant-design/icons";
import {Spin, Upload} from "antd";
import classes from "./DragAndDrop.module.css";

const {Dragger} = Upload

const DragAndDrop = ({value = [], onChange = () => {}}) => {
    const [fileList, setFileList] = useState(value)

    const draggerRef = useRef(null)

    const triggerChange = (changedValue) => {
        onChange?.({
            fileList,
            ...value,
            ...changedValue,
        });
    };

    useEffect(() => {
        triggerChange({fileList: fileList})
    }, [fileList]);

    const onDragEnd = ({active, over}) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    const onFileListChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    useEffect(() => {
        onChange?.({fileList:fileList})
    }, []);

    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    if(!Array.isArray(fileList)){
        return <Spin/>
    }

    return (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                <Dragger
                    ref={draggerRef}
                    beforeUpload={() => {
                        return false
                    }}
                    name={"imgs"}
                    fileList={fileList}
                    listType={"picture"}
                    multiple
                    maxCount={15}
                    onChange={onFileListChange}
                    itemRender={(originNode, file) => (
                        <DraggableUploadListItem originNode={originNode} file={file}/>
                    )}
                >
                    <p className={classes.iconContainer}>
                        <InboxOutlined className={classes.icon}/>
                    </p>
                    <p className={classes.iconText}>
                        Click or drag file to this area to upload
                    </p>
                </Dragger>
            </SortableContext>
        </DndContext>
    );
};

export default DragAndDrop;