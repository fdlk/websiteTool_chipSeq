/**
 * 
 * Ajax function where the given files and checked functions will be received 
 * and send to the Servlet once being parsed and set in the correct format.
 * If data is set in the correct format this will allow the Servlet to parse the 
 * parameters without a problem.
 *   
 */



function performAjaxUpload() {
    
    NProgress.start();
    
    //Used for parsing multipart/form-data
    var formdata = new FormData();

    //gets the files that were given by the user
    var sampleFile = document.getElementById("sampleFile").files;

    //Loops through the list of files
    for (i = 0; i < sampleFile.length; i++) {
        //Appends the files to a formdata that easily can be use for HTML forms multipart/form-data
        formdata.append("sampleFile", sampleFile[i]);
    }

    var checkbox_value = [];
    //Goes through all the checked functions
    $(":checkbox").each(function () {
        var ischecked = $(this).is(":checked");
        if (ischecked) {
            //If function is checked, then add to list
            checkbox_value.push($(this).val());
        }
    });

    var arguments_value = [];
    $('form input[type="number"]').each(function () {
        arguments_value.push($(this).val());
    });
    
    var hidden_value = [];
    $('form input[type="text"]').each(function () {
        hidden_value.push($(this).val());
    });

    //adds the list of checked function
    formdata.append("rSettings", checkbox_value);
    formdata.append("argParams", arguments_value);
    formdata.append("hiddenValues", hidden_value);

    NProgress.inc();

    $.ajax({
        url: 'FileUploadServlet',
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            $('#options').hide();
            NProgress.done();
            $("#changeContent").load("html/results.jsp");
            $('#resultsTest').html("<h3>Download the results:</h3> <a href='DownloadZipFileServlet?zipPath="+data+"'>Download</a>");
            $("#temp_dir").val("data");        
        }
    });
}

