import React, { Component } from 'react';
import DragTreeNode from './DragTreeNode';

class DragTreeNodeRoot extends Component {
    constructor(props) {
        super(props);

        let root = props.node;
        this.state = { rootNode: root };

        //建立parent關系
        this.buildRelation(root);
        console.log(root);

        this.nowDragNode = null;
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    buildRelation(node) {
        let childs = node.childs;
        if (childs == null)
            return;

        childs.forEach(e => {
            e.parent = node;
            this.buildRelation(e);
        });
    }

    onDrag(dragNode) {
        DragTreeNodeRoot.nowDragNode = dragNode;
        DragTreeNodeRoot.nowDragTree = this;
    }

    isdropToSelfBranch(dragNode, dropNode) {
        let node = dropNode;
        while (node != null) {
            if (dragNode == node)
                return true;

            node = node.parent;
        }

        return false;
    }

    refresh() {
        let newRoot = this.state.rootNode;
        this.setState({ rootNode: newRoot });
    }

    onDrop(dropNode) {
        if (DragTreeNodeRoot.nowDragNode == null) {
            alert("nowDragNode is null");
            return;
        }

        if (DragTreeNodeRoot.nowDragNode.parent == null) {
            alert("can not drag root");
            return;
        }

        if (this.isdropToSelfBranch(DragTreeNodeRoot.nowDragNode, dropNode)) {
            alert("dropToSelfBranch");
            return;
        }

        //解除dragNode的關系
        let preParent = DragTreeNodeRoot.nowDragNode.parent;
        let removeIndex = preParent.childs.indexOf(DragTreeNodeRoot.nowDragNode);
        preParent.childs.splice(removeIndex, 1);

        //重新建立dragNode的關系
        if (dropNode.childs == null)
            dropNode.childs = [];

        dropNode.childs.push(DragTreeNodeRoot.nowDragNode);
        DragTreeNodeRoot.nowDragNode.parent = dropNode;

        this.refresh();
        DragTreeNodeRoot.nowDragTree.refresh();

        //清除
        DragTreeNodeRoot.nowDragNode = null;
        DragTreeNodeRoot.nowDragTree = null;
    }

    render() {
        let node = this.props.node;
        return (
            <DragTreeNode key={node.id} node={node} onDragFunc={this.onDrag} onDropFunc={this.onDrop} />
        );
    }
}

DragTreeNodeRoot.nowDragNode = null;
DragTreeNodeRoot.nowDragTree = null;
DragTreeNodeRoot.id = 1;

export default DragTreeNodeRoot;