import React, { Component } from 'react';
import DragTreeNode from './DragTreeNode';

class DragTreeNodeRoot extends Component {
    constructor(props) {
        super(props);

        let root = props.node;
        this.state = { rootNode: root };

        //建立parent關系
        this.buildRelation(root);
        // console.log(root);

        this.nowDragNode = null;
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnterFolder = this.onDragEnterFolder.bind(this);
        this.onDragEnterSwap = this.onDragEnterSwap.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
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

    onDragEnterFolder(targetNode) {
        this.apendTo(targetNode);
    }

    onDragEnterSwap(targetNode) {
        this.onSwap(targetNode);
    }

    onDragEnd() {
        //清除
        console.log("clear");
        // DragTreeNodeRoot.nowDragNode = null;
        // DragTreeNodeRoot.nowDragTree = null;
    }

    isApendToSelfBranch(dragNode, dropNode) {
        let node = dropNode;
        while (node != null) {
            if (dragNode === node)
                return true;

            node = node.parent;
        }

        return false;
    }

    refresh() {
        let newRoot = this.state.rootNode;
        this.setState({ rootNode: newRoot });
    }

    //加入到targetNode底下
    apendTo(targetNode) {
        if (DragTreeNodeRoot.nowDragNode == null) {
            console.log("nowDragNode is null");
            return;
        }

        if (DragTreeNodeRoot.nowDragNode.parent == null) {
            console.log("can not drag root");
            return;
        }

        if (this.isApendToSelfBranch(DragTreeNodeRoot.nowDragNode, targetNode)) {
            console.log("Apend To SelfBranch");
            return;
        }

        //解除dragNode的關系
        let preParent = DragTreeNodeRoot.nowDragNode.parent;
        let removeIndex = preParent.childs.indexOf(DragTreeNodeRoot.nowDragNode);
        preParent.childs.splice(removeIndex, 1);

        //重新建立dragNode的關系
        if (targetNode.childs == null)
            targetNode.childs = [];

        targetNode.childs.unshift(DragTreeNodeRoot.nowDragNode);// insert at head
        DragTreeNodeRoot.nowDragNode.parent = targetNode;

        //更新
        this.refresh();
        DragTreeNodeRoot.nowDragTree.refresh();
    }

    onSwap(dropNode) {
        if (dropNode.parent !== DragTreeNodeRoot.nowDragNode.parent) {
            console.log("parent is not the same");
            return;
        }

        if (dropNode === DragTreeNodeRoot.nowDragNode) {
            console.log("do nothing");
            return;
        }

        //先移除
        let L = dropNode.parent.childs;
        let removeIndex = L.indexOf(DragTreeNodeRoot.nowDragNode);
        L.splice(removeIndex, 1);

        //再插入
        let insertIndex = L.indexOf(dropNode);
        L.splice(insertIndex, 0, DragTreeNodeRoot.nowDragNode);

        //更新
        this.refresh();
        console.log("do insert");
    }

    render() {
        let node = this.props.node;
        return (
            <DragTreeNode key={node.id} node={node}
                onDrag={this.onDrag}
                onDragEnd={this.onDragEnd}
                onDragEnterFolder={this.onDragEnterFolder}
                onDragEnterSwap={this.onDragEnterSwap} />
        );
    }
}

DragTreeNodeRoot.nowDragNode = null;
DragTreeNodeRoot.nowDragTree = null;
DragTreeNodeRoot.id = 1;

export default DragTreeNodeRoot;