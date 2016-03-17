require('./Gallery.scss');

import React from 'react'
import ReactDOM from 'react-dom'
import {onDragOver, onDragOut, onDropFiles, uploadFiles, onPaste} from './Methods'

export default class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            uploading: false,
            uploadError: false,
            uploadProgress: 0,
            dragOver: false
		};
	}

	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).modal({
			detachable: false,
			context: '.dimmable',
			inverted: true,
			transition: 'scale',
			allowMultiple: true,
			observeChanges: true,
			closable: false,
            onHidden: () => {
                this.setState({
                    uploading: false,
                    uploadError: false,
                    uploadProgress: 0,
                    dragOver: false
                });
            }
		});

        $(ReactDOM.findDOMNode(this.refs.breadcrumbDropdown)).dropdown();
	}

    show() {
        $(ReactDOM.findDOMNode(this)).modal('show');
    }

	componentDidUpdate() {
		$(ReactDOM.findDOMNode(this)).modal('refresh');

        $(ReactDOM.findDOMNode(this.refs.progressBar)).progress({
            percent: this.state.uploadProgress
        });

		$(ReactDOM.findDOMNode(this.refs.breadcrumbDropdown)).dropdown();
	}

	render() {
        var galleryFolder = this.props.gallery[this.props.currentPath];

        var thumbnails = [];
        
        if(!galleryFolder.length){
            thumbnails = (
                <p>There are no images in this folder yet. You can drag & drop files here if you want.</p>
            );
        }else{
            galleryFolder.forEach((image, index) => {
                var selectedCls = undefined;
                if(this.props.selectedImage.name == image.name){
                    selectedCls = 'selected';
                }
                thumbnails.push(
                    <a className={'card ' + selectedCls} key={'thumbnail ' + index}>
                        <div className="image">
                            <img className="ui image" data-name={image.name} src={image.src} onClick={onThumbnailSelect.bind(this)}/>
                            <button className="ui icon red mini button" onClick={onThumbnailDelete.bind(this)}>
                                <i className="icon trash"/>
                            </button>
                        </div>
                    </a>
                );
            });
        }

        var progressBar = 'Drag files over the gallery to upload new images';
        if(this.state.uploading){
            progressBar = (
                <div ref="progressBar" className={'ui tiny progress green ' + (this.state.uploadError ? 'error' : '')}>
                    <div className="bar"></div>
                    <div className="label">{this.state.uploadError}</div>
                </div>
            );
        }

        var folders = this.props.currentPath.split('/');
        folders = folders.filter(function(value){
            return value.length > 0
        });
        var breadcrumb = [];
        folders.forEach((folder, index) => {
            var isLast = index+1 == folders.length;
            if(!isLast){
                //todo: find a way to replace hardcoded /images/ data-folder-path on first item
                breadcrumb.push(
                    <a key={'bc_section ' + index} className="section" data-folder-path='/images/' onClick={this.props.onFolderChange}>{folder}</a>
                );
                breadcrumb.push(
                    <div key={'divider ' + index} className="divider"> / </div>
                );
            }else{
                var breadcrumbMenu = [];
                var y = 0;
                for(var galleryFolder in this.props.gallery){
                    var galleryFolderParts = galleryFolder.split('/');
                    galleryFolderParts = galleryFolderParts.filter(function(value){
                        return value.length > 0
                    });
                    galleryFolderParts.shift();
                    galleryFolderParts.join('');

                    if(galleryFolder != this.props.currentPath && galleryFolderParts != ''){
	                    var imageCount = this.props.gallery[galleryFolder].length;
	                    breadcrumbMenu.push(
                            <div key={'bc_section_item ' +y} className="item" data-folder-path={galleryFolder} onClick={this.props.onFolderChange}>
                                <div className="description"><a className={"ui circular label mini " + (imageCount == 0 ? 'grey' : 'blue')} style={{marginTop: -2}}>{imageCount}</a></div>
                                {galleryFolderParts}
                            </div>
                        );
                    }
                    y++;
                }
                
                breadcrumb.push(
                    <div key={'bc_dropdown ' + index} className="ui dropdown item" ref="breadcrumbDropdown">
                        <div className="text">{folder}</div>
                        <i className="dropdown icon"/>
                        <div className="menu" style={{marginTop: 5, minWidth: '100%'}}>
                            {breadcrumbMenu}
                        </div>
                    </div>
                );
            }
        });

		return (
			<div className="ui large modal gallery" onDragOver={onDragOver.bind(this)} onPaste={onPaste.bind(this)}>
                <i className="close icon"/>
                <div className="header">
                    <div className="ui breadcrumb folders-breadcrumb">
                        {breadcrumb}
                    </div>
                </div>
                <div ref="dropZone" className={"ui dimmer inverted drop-zone drop-zone-receiver " + (this.state.dragOver ? 'dragover' : '')} onDragLeave={onDragOut.bind(this)} onDrop={onDropFiles.bind(this)}>
                    <div className="ui content">
                        <div className="center">
                            <h2 className="ui icon header">
                                <i className="image file outline icon"/>
                                Drop files here
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="ui content">
                    <div ref="gallery" className="ui five stackable cards"
                         style={{overflow: 'auto', height: this.state.contentHeight + 'px'}}>
                        {thumbnails}
                    </div>
                </div>
                <div className="actions">
                    <div className="ui middle aligned grid">
                        <div className="left aligned fourteen wide column">
                            {progressBar}
                        </div>
                        <div className="right aligned two wide column">
                            <div className="ui cancel button fluid">Close</div>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}


Gallery.propTypes = {
    currentPath: React.PropTypes.string,
	gallery: React.PropTypes.object,
	onThumbnailClick: React.PropTypes.func,
    onThumbnailDelete: React.PropTypes.func
};

function onThumbnailSelect(event) {
    var $thumbnail = $(event.target);
	var name = $thumbnail.data('name');
	var src = $thumbnail.attr('src');

    this.props.onThumbnailClick(this.props.currentPath, name, src);
	$(ReactDOM.findDOMNode(this)).modal('hide');
}

function onThumbnailDelete(event) {
	var $selectBtn = $(event.target);
	var $thumbnail = $selectBtn.closest('.card').find('img');
	var name = $thumbnail.data('name');
	this.props.onThumbnailDelete(this.props.currentPath, name);
}