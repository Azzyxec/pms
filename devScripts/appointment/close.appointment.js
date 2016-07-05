$(document).ready(function(){



//initialize blueimp fileupload plugin

var fi = $('#fileupload');
var process_url = links.closeApptUploadFiles; //PHP script
fi.fileupload({
    url: process_url,
    dataType: 'json',
    autoUpload: false,

    acceptFileTypes: /(\.|\/)(gif|jpe?g|png|mp4|mp3)$/i,
    maxFileSize: 1048576, //1MB
    maxNumberOfFiles:'1',
    // Enable image resizing, except for Android and Opera,
    // which actually support image resizing, but fail to
    // send Blob objects via XHR requests:
    disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator.userAgent),
    previewMaxWidth: 50,
    previewMaxHeight: 50,
    previewCrop: true

});

var progressBar = $('<div/>').addClass('progress').append($('<div/>').addClass('progress-bar')); //create progress bar
var uploadButton = $('<button/>').addClass('btn btn-info ').text('Upload');    //create upload button

uploadButton.on('click', function () {


  //button click function
    var $this = $(this), data = $this.data();
    data.submit().always(function () { //upload the file
            $this.remove(); //remove this button
    });
});

fi.on('fileuploadadd', function (e, data) {
        data.context = $('<div/>').addClass('file-wrapper').appendTo('#files'); //create new DIV with "file-wrapper" class
        $.each(data.files, function (index, file){  //loop though each file
        var node = $('<div/>').addClass('file-row'); //create a new node with "file-row" class
        var removeBtn  = $('<button/>').addClass('btn btn-info ').text('Remove'); //create new remove button
        removeBtn.on('click', function(e, data){ //remove button function
            $(this).parent().parent().remove(); //remove file's wrapper to remove queued file
        });

        //create file info text, name and file size
        var file_txt = $('<div/>').addClass('file-row-text ').append('<span>'+file.name  + '</span>');

        file_txt.append(removeBtn); //add remove button inside info text element
        file_txt.prependTo(node).append(uploadButton.clone(true).data(data)); //add to node element
        progressBar.clone().appendTo(file_txt); //add progress bar
        if (!index){
            node.prepend(file.preview); //add image preview
        }

        node.appendTo(data.context); //attach node to data context
    });
});
fi.on('fileuploadprogress', function (e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
    if (data.context) {
        data.context.each(function () {
            $(this).find('.progress').attr('aria-valuenow', progress).children().first().css('width',progress + '%').text(progress + '%');
        });
    }
});
fi.on('fileuploaddone', function (e, data) { // invoke callback method on success
    $.each(data.result.files, function (index, file) { //loop though each file
        if (file.url){ //successful upload returns a file url
            var link = $('<a>') .attr('target', '_blank') .prop('href', file.url);
            $(data.context.children()[index]).addClass('file-uploaded');
            $(data.context.children()[index]).find('canvas').wrap(link); //create a link to uploaded file url
            $(data.context.children()[index]).find('.file-remove').hide(); //hide remove button
            var done = $('<span class="text-success"/>').text('Uploaded!'); //show success message
            $(data.context.children()[index]).append(done); //add everything to data context
        } else if (file.error) {
            var error = $('<span class="text-danger"/>').text(file.error); //error text
            $(data.context.children()[index]).append(error); //add to data context
        }
    });
});




});
