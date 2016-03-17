require('./FileManager.scss');

import React from 'react'
import Image from './Image'
import Gallery from './Gallery'

var basePath = '/uploads/';
var images = [];
for(var i = 1; i <= 18; i++){
	images.push({
		name: basePath + ("0000" + i).slice(-4)+'.jpg',
		src: basePath + ("0000" + i).slice(-4)+'.jpg'
	});
}

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
            }.bind(this),
			onPastedContent: (base64data) => {
				var ts = new Date().getTime();
				var gallery = this.state.gallery;
				gallery.push({
					name: basePath + ts + '.jpg',
					src: base64data
				});
				this.setState({
					gallery: gallery
				});
				this.refs.imageModal.setPath(base64data);
			}
		};
		var GalleryProps = {
			//selected: '/uploads/1000000000237780_1920x1080.jpg',
            basePath: this.state.basePath,
			gallery: this.state.gallery,
			onThumbnailClick: (path) => {
				this.refs.imageModal.setPath(path);
			},
			onThumbnailDelete: (name, src) => {
				var gallery = this.state.gallery;
				var pathIndex = false;
				gallery.forEach(function(obj, index){
					if(obj.name == name){
						pathIndex = index;
					}
				});
				delete gallery[pathIndex];
				this.setState({
					gallery: gallery
				});

				if(this.refs.imageModal.state.path == name){
					this.refs.imageModal.setPath();
				}
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