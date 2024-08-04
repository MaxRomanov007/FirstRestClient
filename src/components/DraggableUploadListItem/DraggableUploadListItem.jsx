import {
    useSortable,
} from '@dnd-kit/sortable';

import classes from "./DraggableUploadListItem.module.css"
import { CSS } from '@dnd-kit/utilities';

const DraggableUploadListItem = ({ originNode, file }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: file.uid,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'move',
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            // prevent preview event when drag end
            className={isDragging ? classes.isDragging : ''}
            {...attributes}
            {...listeners}
        >
            {/* hide error tooltip when dragging */}
            {file.status === 'error' && isDragging ? originNode.props.children : originNode}
        </div>
    );
};

export default DraggableUploadListItem