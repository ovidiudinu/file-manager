require('./Gallery.scss');

import React from 'react'
import ReactDOM from 'react-dom'
import {onDragOver, onDragOut, onDropFiles, uploadFiles} from './Methods'

export default class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: props.selected,
			gallery: props.gallery,
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
	}

    show(callBack) {
        this._callBack = callBack;
        $(ReactDOM.findDOMNode(this)).modal('show');
    }

	componentDidUpdate() {
		$(ReactDOM.findDOMNode(this)).modal('refresh');

        $(ReactDOM.findDOMNode(this.refs.progressBar)).progress({
            percent: this.state.uploadProgress
        });
	}

	render() {
		var thumbnails = [];
		this.state.gallery.forEach(function (image, index) {
			var selected = '';
			if(image.src == this.state.selected) {selected = 'selected'}
			thumbnails.push(
				<a className={'card ' + selected} key={'thumbnail ' + index}>
					<div className="image">
						<img className="ui image" data-name={image.name} src={image.src} onClick={onThumbnailSelect.bind(this)}/>
						<button className="ui icon red mini button" onClick={onThumbnailDelete.bind(this)}>
							<i className="icon trash"/>
						</button>
					</div>
				</a>
			);
		}.bind(this));

        var progressBar = 'Drag files over the gallery to upload new images';
        if(this.state.uploading){
            progressBar = (
                <div ref="progressBar" className={'ui tiny progress green ' + (this.state.uploadError ? 'error' : '')}>
                    <div className="bar"></div>
                    <div className="label">{this.state.uploadError}</div>
                </div>
            );
        }

		return (
			<div className="ui large modal gallery" onDragOver={onDragOver.bind(this)}>
                <i className="close icon"/>
                <div className="header">
                    Image Gallery
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
	selected: React.PropTypes.string,
	gallery: React.PropTypes.array,
	onThumbnailClick: React.PropTypes.func
};

function onThumbnailSelect(event) {
    var $thumbnail = $(event.target);
	var name = $thumbnail.data('name');
	var src = $thumbnail.attr('src');
	this.props.onThumbnailClick(src);
	this.setState({
		selected: name
	});
	$(ReactDOM.findDOMNode(this)).modal('hide');
}

function onThumbnailDelete(event) {
	var $selectBtn = $(event.target);
	var $thumbnail = $selectBtn.closest('.card').find('img');
	var name = $thumbnail.data('name');
	var src = $thumbnail.attr('src');
	this.props.onThumbnailDelete(name, src);
}