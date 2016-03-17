export function onDragOver(event) {
    event.preventDefault();
    this.setState({
        dragOver: true
    });
}

export function onDragOut(event) {
    event.preventDefault();
    this.setState({
        dragOver: false
    });
}

export function onDropFiles(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    uploadFiles.call(this, files);
    this.setState({
        dragOver: false
    });
}

export function onPaste(event) {
    var item = event.clipboardData.items[0];
    if(item && item.type.indexOf('image') > -1) {
        var itemData = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function (event) {
	        this.props.onPastedContent(event.target.result);
        }.bind(this);
        reader.readAsDataURL(itemData);
    }
}

export function uploadFiles(files) {
    this.setState({
        uploading: true,
        uploadError: false,
        uploadProgress: 0
    });

    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', './upload.php');
    xhr.onload = function() {
        this.setState({
            uploadProgress: 100
        });
    }.bind(this);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            this.setState({
                uploading: false,
                uploadProgress: 0
            });
            this.setPath(files[0].name);
        }
        if (xhr.readyState == 4 && xhr.status != 200) {
            this.setState({
                uploadError: xhr.responseText,
                uploadProgress: 100
            });
        }
    }.bind(this);
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            this.setState({
                uploadProgress: complete
            });
        }
    }.bind(this);

    xhr.send(formData);
}