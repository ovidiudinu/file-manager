require('./Image.scss');

import React from 'react'
import ReactDOM from 'react-dom'
import {onDragOver, onDragOut, onDropFiles, onPaste, uploadFiles} from './Methods'

export default class Image extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path: props.path,
			alt: props.alt,
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
				// if (this._cb) {
				// 	this._cb(null)
				// 	delete this._cb
				// }
				this.setState({
					uploading: false,
					uploadError: false,
					uploadProgress: 0,
					dragOver: false
				});
			},
			onApprove: () => {
				// this._cb(this.refs.link.value)
				// delete this._cb
			}
		});
	}

	componentDidUpdate() {
		$(ReactDOM.findDOMNode(this)).modal('refresh');

		$(ReactDOM.findDOMNode(this.refs.progressBar)).progress({
			percent: this.state.uploadProgress
		});
	}

	show(callBack) {
		this._callBack = callBack;
		$(ReactDOM.findDOMNode(this)).modal('show');
	}

	render() {

		var progressBar = undefined;
		if(this.state.uploading){
			progressBar = (
				<div ref="progressBar" className={'ui tiny progress green ' + (this.state.uploadError ? 'error' : '')}>
					<div className="bar"></div>
					<div className="label">{this.state.uploadError}</div>
				</div>
			);
		}

		return (
            <div className="ui small modal image">
				<div className="header">
					Insert Image
				</div>
				<div className="ui content">
					<div ref="form" className="ui form">
						<div className="ui padded fluid grid">
							<div className="four wide column">
								<div className="ui segment">
									<img className="ui fluid image" src={this.state.path ? this.state.path : '/img/blank.png'} onClick={openGallery.bind(this)}/>
								</div>
							</div>
							<div className="twelve wide column">
								<div className="field">
									<label>URL</label>
									<div className="ui action input fluid">
										<input ref="path"
										       data-state="path"
										       value={this.state.path}
										       type="text"
										       placeholder="Insert link, select from gallery or paste image data..."
										       onChange={onPathChange.bind(this)}
                                               onPaste={onPaste.bind(this)}
										/>
										<button className="ui icon button show-gallery" onClick={openGallery.bind(this)}>
											<i className="folder open icon"/>
										</button>
									</div>
								</div>
								<div className="field">
									<label>ALT</label>
									<div className={"ui input fluid"}>
										<input ref="alt"
										       data-state="alt"
										       value={this.state.alt}
										       type="text"
										       placeholder="Alt text"
										       onChange={onAltChange.bind(this)}
										/>
									</div>
								</div>
							</div>
						</div>

                        <div className="ui divider hidden"></div>
						<div className="ui horizontal divider">Or</div>
						<div className="ui divider hidden"></div>
						<div className="ui cards">
							<div className="ui fluid card">
								<div ref="dropZone" className={'content center aligned drop-zone ' + (this.state.dragOver ? 'dragover' : '')} onDragOver={onDragOver.bind(this)}>
									<div className="drop-zone-receiver" onDragLeave={onDragOut.bind(this)} onDrop={onDropFiles.bind(this)}></div>
									<div className="header">
										<i className="image file outline icon"/>
										{(this.state.dragOver ? 'Drop files here' : 'Drag files here')}
									</div>
									<div className="description">
										<input className="manual-upload-input"
										       type="file"
										       multiple="multiple"
										       accept="image/*"
										       onChange={onManualUploadChange.bind(this)}
										/>
										or <a className="manual-upload-text" herf="javascript:void();">upload from computer</a>
									</div>
									{progressBar}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="actions">
					<div className="ui positive button">Insert</div>
					<div className="ui cancel button">Cancel</div>
				</div>
			</div>
		)

    }

	setPath(path) {
		if(!path) path = '';
		this.setState({
			path: path
		});
	}

	setAlt(alt) {
		if(!alt) alt = '';
		this.setState({
			alt: alt
		});
	}
}

Image.propTypes = {
	path: React.PropTypes.string,
	alt: React.PropTypes.string,
    onOpenGallery: React.PropTypes.func
};

function openGallery() {
    this.props.onOpenGallery();
}

function onPathChange(event) {
	this.setPath(event.target.value);
}

function onAltChange(event) {
	this.setAlt(event.target.value);
}

function onManualUploadChange(event) {
	var files = event.target.files;
	uploadFiles.call(this, files);
}