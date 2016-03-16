require('./FileManager.scss');

import React from 'react'
import Image from './Image'
import Gallery from './Gallery'

var basePath = '/uploads/';
var images = [{
    name: 'img_0001.jpg',
    src: 'img_0001.jpg'
},{
    name: 'img_0002.jpg',
    src: 'img_0002.jpg'
},{
    name: 'img_0003.jpg',
    src: 'img_0003.jpg'
},{
    name: 'img_0004.jpg',
    src: 'img_0004.jpg'
}];

export default class FileManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basePath: basePath,
            gallery: images
        };
    }
    
	componentDidMount() {
		this.refs.imageModal.show(null);
        //this.refs.galleryModal.show(null);
	}

	render() {
		var ImageProps = {
			//path: '/uploads/1000000000237780_1920x1080.jpg',
			//alt: 'Some test image',
			onOpenGallery: function(){
                this.refs.galleryModal.show(null);
            }.bind(this)
		};
		var GalleryProps = {
			//selected: '/uploads/1000000000237780_1920x1080.jpg',
            basePath: this.state.basePath,
			gallery: this.state.gallery,
			onThumbnailClick: (path) => {
				this.refs.imageModal.setPath(path);
			}
		};
        return (
            <div className="file-manager">
	            <button className="ui labeled icon button primary" onClick={onClick.bind(this)}>
		            <i className="upload icon"></i>
		            Upload
	            </button>
	            <Image ref="imageModal" {...ImageProps}/>
	            <Gallery ref="galleryModal" {...GalleryProps}/>
            </div>
        )
    }
}

function onClick() {
	this.refs.imageModal.show(null);
}