require('./FileManager.scss');

import React from 'react'
import Image from './Image'
import Gallery from './Gallery'

var images = [
	'/uploads/1000000000237780_1920x1080.jpg',
	'/uploads/1000000000237792_1920x1080.jpg',
	'/uploads/1000000000251304_1920x1080.jpg',
	'/uploads/1000000000251726_1920x1080.jpg',
	'/uploads/3000000000250066_1920x1080.jpg',
	'/uploads/4000000000238126_1920x1080.jpg',
	'/uploads/5000000000244682_1920x1080.jpg',
	'/uploads/6000000000248750_1920x1080.jpg',
	'/uploads/6000000000248792_1920x1080.jpg',
	'/uploads/6000000000262536_1920x1080.jpg',
	'/uploads/103000000000244380_1920x1080.jpg',
	'/uploads/105000000000245340_1920x1080.jpg',
	'/uploads/105000000000245350_1920x1080.jpg',
	'/uploads/106000000000244098_1920x1080.jpg',
	'/uploads/107000000000250154_1920x1080.jpg',
	'/uploads/107000000000260874_1920x1080.jpg',
	'/uploads/108000000000259346_1920x1080.jpg',
	'/uploads/109000000000248798_1920x1080.jpg',
	'/uploads/109000000000249510_1920x1080.jpg',
	'/uploads/109000000000264044_1920x1080.jpg',
	'/uploads/110000000000237420_1920x1080.jpg',
	'/uploads/110000000000251138_1920x1080.jpg',
	'/uploads/112000000000244958_1920x1080.jpg',
	'/uploads/112000000000254408_1920x1080.jpg',
	'/uploads/113000000000240588_1920x1080.jpg',
	'/uploads/115000000000241830_1920x1080.jpg',
	'/uploads/115000000000252356_1920x1080.jpg',
	'/uploads/116000000000244748_1920x1080.jpg',
	'/uploads/116000000000255780_1920x1080.jpg',
	'/uploads/116000000000260152_1920x1080.jpg',
	'/uploads/117000000000248702_1920x1080.jpg',
	'/uploads/117000000000248708_1920x1080.jpg',
	'/uploads/117000000000259588_1920x1080.jpg',
	'/uploads/118000000000242296_1920x1080.jpg',
	'/uploads/118000000000256708_1920x1080.jpg',
	'/uploads/119000000000238968_1920x1080.jpg',
	'/uploads/119000000000238974_1920x1080.jpg',
	'/uploads/119000000000254418_1920x1080.jpg',
	'/uploads/120000000000245666_1920x1080.jpg',
	'/uploads/120000000000254910_1920x1080.jpg'
];

export default class FileManager extends React.Component {
	componentDidMount() {
		this.refs.imageModal.show(null);
	}

	render() {
		var ImageProps = {
			//path: '/uploads/1000000000237780_1920x1080.jpg',
			//alt: 'Some test image',
			gallery: images
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