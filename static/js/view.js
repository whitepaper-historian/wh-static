
//Self-invokation to ensure jQuery encapsulation
//Explanation: http://blog.bigbinary.com/2009/03/13/understanding-jquery-plugin-pattern-and-self-invoking-javascript-function.html
(function rideScopeWrapper($) {

    function requestWhitepapers() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/getwhitepapers',
            /*
            Try auth later
            headers: {
                Authorization: authToken
            },
            contentType: 'application/json',*/
            dataType: 'json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error getting whitepapers: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured while requesting whitepapers:\n' + jqXHR.responseText);
            }
        });
    }

    //For now, just add results to the table on page
    /*Expected item coming in:
        {
            "array" : [
                {
                    "title"       : <String>,
                    "updated"       : <String>,
                    "pdf_link"        : <String>,
                    "kindle_link" : <String>
                }
            ]
        }
    */
    function completeRequest(result) {
        $(function onDocReady() {
            $.fn.dataTable.ext.errMode = 'none';
            var table = $('#whitepapers').DataTable({
                data: result.Items,
                columns: [
                    {data: 'title'},
                    {data: 'updated'},
                    {data: 'pdf_link'},
                    {data: 'kindle_link'}
                ]
            });
            // var items = result.Items;
            // items.forEach(function(item){
            //     table.row.add({

            //     });
            // });
            //table.draw();
        });
    }

    $(function onDocReady() {
        /*$('#update').click(handleUpdateClick);
        $('#update').prop('disabled', false);*/
        requestWhitepapers();
    });


    function handleUpdateClick(event) {
        event.preventDefault();
        requestWhitepapers();
    }

}(jQuery));