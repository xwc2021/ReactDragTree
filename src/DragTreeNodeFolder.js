import React, { Component } from 'react';
import DrageTreeNode from './DragTreeNode';

class DragTreeNodeFolder extends Component {
    render() {
        let { node, onDrag, onDragEnterFolder, onDragEnterSwap } = this.props;

        if (node.childs == null)
            return null;

        let content = node.childs.map(ele =>
            <DrageTreeNode key={ele.id} node={ele}
                onDrag={onDrag}
                onDragEnterFolder={onDragEnterFolder}
                onDragEnterSwap={onDragEnterSwap} />
        );
        return (
            <div>
                {content}
            </div >
        );
    }
}

export default DragTreeNodeFolder;