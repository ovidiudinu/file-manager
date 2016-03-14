require('./Gallery.scss');

import React from 'react'
import ReactDOM from 'react-dom'

export default class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: props.selected,
			gallery: props.gallery
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
			closable: false
		});
	}

    show(callBack) {
        this._callBack = callBack;
        $(ReactDOM.findDOMNode(this)).modal('show');
    }

	componentDidUpdate() {
		$(ReactDOM.findDOMNode(this)).modal('refresh');
	}

	render() {
		var thumbnails = [];
		this.state.gallery.forEach(function (path, index) {
			var selected = '';
			if(path == this.state.selected) {selected = 'selected'};
			thumbnails.push(
				<a className={'card ' + selected} key={'thumbnail ' + index}>
					<div className="image">
						<img className="ui image" src={path} onClick={onThumbnailSelect.bind(this)}/>
						<button className="ui icon red mini button" onClick={onThumbnailDelete.bind(this)}>
							<i className="icon trash"/>
						</button>
					</div>
				</a>
			);
		}.bind(this));
		return (
			<div className="ui large modal gallery">
				<div className="header">
					Image Gallery
				</div>
				<div className="ui content">
					<div ref="gallery" className="ui five stackable cards"
					     style={{overflow: 'auto', height: this.state.contentHeight + 'px'}}>
						{thumbnails}
					</div>
				</div>
				<div className="actions">
					<div className="ui cancel button">Close</div>
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
	var path = $thumbnail.attr('src');
	this.props.onThumbnailClick(path);
	this.setState({
		selected: path
	});
	$(ReactDOM.findDOMNode(this)).modal('hide');
}

function onThumbnailDelete(event) {
	var $selectBtn = $(event.target);
	var $thumbnail = $selectBtn.closest('.card').find('img');
	var path = $thumbnail.attr('src');

	console.warn('Implement server side image removal');

	var gallery = this.state.gallery;
	var pathIndex = gallery.indexOf(path);
	delete gallery[pathIndex];
	this.setState({
		gallery: gallery
	});
}