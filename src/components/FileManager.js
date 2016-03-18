require('./FileManager.scss');

import React from 'react'
import Image from './Image'
import Gallery from './Gallery'

var rootPath = '/';
var basePath = 'images/';

var gallery = {};
gallery[rootPath + basePath] = [];
gallery[rootPath + basePath + 'contributing-on-site-stacker-docs/'] = [];
gallery[rootPath + basePath + 'develop-on-site-stacker/'] = [];
gallery[rootPath + basePath + 'empty-folder/'] = [];

for(var folder in gallery){
	if(folder.indexOf('empty-folder') < 0) {
		for (var i = 1; i <= 8; i++) {
			gallery[folder].push({
				name: folder + ("0000" + i).slice(-4) + '.jpg',
				src: folder + ("0000" + i).slice(-4) + '.jpg'
			});
		}
	}
}

export default class FileManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: rootPath + basePath + 'empty-folder/',
            // currentPath: rootPath + basePath,
            selectedImage: false,
            altText: false,
            gallery: gallery
        };
    }

	componentDidMount() {
		this.refs.imageModal.show();
        this.refs.galleryModal.show();
	}

	render() {
		var ImageProps = {
            currentPath: this.state.currentPath,
            gallery: this.state.gallery,
            selectedImage: this.state.selectedImage,
			onOpenGallery: () => {
                this.refs.galleryModal.show();
            },
            onUrlChange: (event) => {
                this.setState({
                    selectedImage: {
                        name: event.target.value,
                        src: event.target.value
                    }
                });
            },
            onAltChange: (event) => {
                this.setState({
                    altText: event.target.value
                });
            },
			onPastedContent: (base64data, setValue) => {
				var ts = new Date().getTime();
				var gallery = this.state.gallery;
                var pastedImage = {
                    name: this.state.currentPath + ts + '.jpg',
                    src: base64data
                };
                gallery[this.state.currentPath].push(pastedImage);
                this.setState({
                    gallery: gallery
                });
                if(setValue && setValue == true){
                    this.setState({
                        selectedImage: pastedImage
                    });
                }
			}
		};
		var GalleryProps = {
            currentPath: this.state.currentPath,
			gallery: this.state.gallery,
            selectedImage: this.state.selectedImage,
            onThumbnailClick: (folder, name, src) => {
                this.setState({
                    currentPath: folder,
                    selectedImage: {
                        name: name,
                        src: src
                    }
                });
			},
			onThumbnailDelete: (folder, fileName) => {
                var gallery = this.state.gallery;

                for(var folderProp in gallery){
                    var pathIndex = false;
                    if(folder == folderProp){
                        gallery[folderProp].forEach(function(file, index){
                            if(file.name == fileName){
                                pathIndex = index;
                            }
                        });
                        gallery[folderProp].splice(pathIndex, 1);
                    }
                }

                this.setState({
                    gallery: gallery
                });

                if(fileName == this.state.selectedImage.name){
                    this.state.selectedImage = '';
                }

			},
            onFolderChange: (event) => {
                event.preventDefault();
                var $folderBtn = $(event.target);
                var path = $folderBtn.data('folder-path');
                this.setState({
                    currentPath: path
                });
            },
			onPastedContent: (base64data, setValue) => {
				var ts = new Date().getTime();
				var gallery = this.state.gallery;
				var pastedImage = {
					name: this.state.currentPath + ts + '.jpg',
					src: base64data
				};
				gallery[this.state.currentPath].push(pastedImage);
                this.setState({
                    gallery: gallery
                });
                if(setValue && setValue == true){
                    this.setState({
                        selectedImage: pastedImage
                    });
                }
			}
		};
        return (
            <div className="file-manager">
	            <button className="ui labeled icon button primary" onClick={onClick.bind(this)}>
		            <i className="upload icon"/>
		            Upload
	            </button>
	            <Image ref="imageModal" {...ImageProps}/>
	            <Gallery ref="galleryModal" {...GalleryProps}/>
            </div>
        )
    }
}

function onClick() {
    this.refs.imageModal.show();
}