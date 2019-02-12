import React, { Component } from 'react';
import './DragTreeNode.css';
import DragTreeNodeFolder from './DragTreeNodeFolder';

class DragTreeNode extends Component {
    constructor(props) {
        super(props);

        this.state = { showChild: true };

        this.toggleChild = this.toggleChild.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onChange = this.onChange.bind(this);

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
    }

    toggleChild() {
        this.setState((state) => {
            return { showChild: !state.showChild };
        });
    }

    onDrag(e) {
        e.preventDefault();
        // console.log("Drag" + this.props.node.name);
        this.props.onDragFunc(this.props.node);
    }

    onChange(e) {
        e.preventDefault();
        this.props.onChange(this.props.node);
    }

    onDrop(e) {
        e.preventDefault();
        this.props.onDropFunc(this.props.node);
    }

    onDragEnter(e) {
        e.preventDefault();
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDragLeave(e) {
        e.preventDefault();
    }

    render() {
        let { node, onDragFunc, onDropFunc, onChange } = this.props;
        let content = <DragTreeNodeFolder onDragFunc={onDragFunc} onDropFunc={onDropFunc} onChange={onChange} node={node} />;
        let hasChild = node.childs != null && node.childs.length > 0;
        let showChild = this.state.showChild;
        let toggleHtml = <span className="Toggle" onClick={this.toggleChild}>{showChild ? "-" : "+"}</span>;
        return (
            <div className="Node">
                <span className="Drag" role="img" aria-label="pizza" draggable onDrag={this.onDrag}>🍕</span>
                <span role="img" aria-label="交換"
                    onDragEnter={this.onDragEnter}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onChange}>💫</span>
                {node.name}
                <span role="img" aria-label="公事包"
                    onDragEnter={this.onDragEnter}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}>💼</span>

                {hasChild ? toggleHtml : null}
                {showChild ? content : null}
            </div >
        );
    }
}

export default DragTreeNode;