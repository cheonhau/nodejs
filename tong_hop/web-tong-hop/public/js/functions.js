$(document).ready(function() {

	// validation date không cho sửa trên input
	$('.js-date').on('keypress keydown keyup paste', function (e) {
		var charCode = (e.which) ? e.which : event.keyCode;
		if(charCode == 9)
		{
			return true;
		}

		return false;
	});

	// validation max leng là 20
	var val_put_search_before = '';
    $('.js-date').on('keydown keyup change paste', function () {
        if ( $(this).val().length > 20 ) {
            $(this).val(val_put_search_before);
        } else {
            val_put_search_before = $(this).val();
        }
    })

});
// $('.js-only-number').keypress(function (event) {
//     return isNumber(event, this);
// });
$('.js-only-number').keypress(function (event) {
	if ( isNaN( String.fromCharCode(event.keyCode) )) return false;
});
$('.js-nokeyboard').bind("cut copy paste",function(e) {
    e.preventDefault();
});
$('.js-length').keypress(function (event) {
	var max = $(event.target).attr('max-length');
	if(event.target.value.length >= max) {
		return false;
	}
})
$('.js-length').bind('paste', function (e) {
	var val_origin = $(this).val();
	var val_add = e.originalEvent.clipboardData.getData('Text');
	var max = $(e.target).attr('max-length');
	if ( val_origin.length + val_add.length > max) {
		return false;
	}
});
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// let send_data = {id : id};
loadData = async (method_to, path_to, send_data = {}) => {
	try {
		let url = window.location.origin + path_to;
		
		let settings = {
			method : method_to,
			headers : {
				'Accept': 'application/json',
            	'Content-Type': 'application/json',
			},
			body: JSON.stringify(send_data)
		}
		let fetch = await fetch(url, settings);
		let data = await fetch.json();

		return data;
	} catch (error) {
		console.log(error);
	}
}