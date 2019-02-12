import React, { Component } from 'react';
import './DragTreeNode.css';
import DragTreeNodeFolder from './DragTreeNodeFolder';

class DragTreeNode extends Component {
    constructor(props) {
        super(props);

        this.state = { showChild: true };

        this.toggleChild = this.toggleChild.bind(this);
        this.onDrag = this.onDrag.bind(this);

        this.onDragEnterFolder = this.onDragEnterFolder.bind(this);
        this.onDragEnterSwap = this.onDragEnterSwap.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
    }

    toggleChild() {
        this.setState((state) => {
            return { showChild: !state.showChild };
        });
    }

    onDrag(e) {
        e.preventDefault();
        console.log("Drag" + this.props.node.name);
        this.props.onDrag(this.props.node);
    }

    onDragEnterFolder(e) {
        console.log("Folder");
        e.preventDefault();
        this.props.onDragEnterFolder(this.props.node);
    }

    onDragEnterSwap(e) {
        console.log("Swap");
        e.preventDefault();
        this.props.onDragEnterSwap(this.props.node);
    }

    onDragOver(e) {
        e.preventDefault();
    }

    render() {
        let { node, onDrag, onDragEnterFolder, onDragEnterSwap } = this.props;
        let content = <DragTreeNodeFolder node={node} onDrag={onDrag} onDragEnterFolder={onDragEnterFolder} onDragEnterSwap={onDragEnterSwap} />;
        let hasChild = node.childs != null && node.childs.length > 0;
        let showChild = this.state.showChild;
        let toggleHtml = <span className="Toggle" onClick={this.toggleChild}>{showChild ? "-" : "+"}</span>;
        return (
            <div className="Node">
                <span className="Drag" role="img" aria-label="pizza" draggable
                    onDrag={this.onDrag}>🍕</span>
                <span role="img" aria-label="交換"
                    onDragEnter={this.onDragEnterSwap}
                    onDragOver={this.onDragOver}>💫</span>
                {node.name}
                <span role="img" aria-label="公事包"
                    onDragEnter={this.onDragEnterFolder}
                    onDragOver={this.onDragOver}>💼</span>

                {hasChild ? toggleHtml : null}
                {showChild ? content : null}
            </div >
        );
    }
}

export default DragTreeNode;