require('./FileManager.scss');

import React from 'react'
import Image from './Image'
import Gallery from './Gallery'

var images = [
	'/uploads/img_0001.jpg',
	'/uploads/img_0002.jpg',
	'/uploads/img_0003.jpg',
	'/uploads/img_0004.jpg',
	'/uploads/Earth-logo.gif',
	'/uploads/img_0005.jpg',
	'/uploads/img_0006.jpg',
	'/uploads/img_0007.jpg',
	'/uploads/img_0008.jpg',
	'/uploads/img_0009.jpg',
	'/uploads/img_0010.jpg',
	'/uploads/img_0011.jpg',
	'/uploads/img_0012.jpg',
	'/uploads/img_0013.jpg',
	'/uploads/img_0014.jpg',
	'/uploads/img_0015.jpg',
	'/uploads/img_0016.jpg',
	'/uploads/img_0017.jpg',
	'/uploads/img_0018.jpg',
	'/uploads/img_0019.jpg',
	'/uploads/img_0020.jpg',
	'/uploads/img_0021.jpg',
	'/uploads/img_0022.jpg',
	'/uploads/img_0023.jpg',
	'/uploads/img_0024.jpg',
	'/uploads/img_0025.jpg',
	'/uploads/img_0026.jpg',
	'/uploads/img_0027.jpg',
	'/uploads/img_0028.jpg',
	'/uploads/img_0029.jpg',
	'/uploads/img_0030.jpg'
];

export default class FileManager extends React.Component {
	componentDidMount() {
		this.refs.imageModal.show(null);
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
			gallery: images,
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