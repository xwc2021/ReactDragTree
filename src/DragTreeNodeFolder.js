import React, { Component } from 'react';
import DrageTreeNode from './DragTreeNode';

class DragTreeNodeFolder extends Component {
    render() {
        let { node, onDragFunc, onDropFunc } = this.props;

        if (node.childs == null)
            return null;

        let content = node.childs.map(ele => <DrageTreeNode key={ele.id} node={ele} onDragFunc={onDragFunc} onDropFunc={onDropFunc} />);
        return (
            <div>
                {content}
            </div >
        );
    }
}

export default DragTreeNodeFolder;