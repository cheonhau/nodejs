// action add
$('.oth-simple-add').on('click', function () {
    // $('#simple-form-people')[0].reset();
    $('#simple-form-people').attr('action', window.location.origin + '/simple/add');
});
// action edit
$('.oth-simple-edit').on('click', function () {
    $('#simple-form-people').attr('action', window.location.origin + '/simple/edit');
    let id = $(this).attr('data-id');
    // ajax de lay thong tin show len form
    $('#ActionModal').modal('show');
});
// action delete 
$('.oth-simple-delete').on('click', function () {
    let id = $(this).attr('data-id');
    $('.oth-delete-people').attr('data-id', id);
    $('#deleteModal').modal('show');
});
$('.oth-delete-people').on('click', function () {
    let id = $(this).attr('data-id');
    let data_send = {id : id};
    let url  = window.location.origin + '/simple/delete'
    $.ajax({
        url : url,
        method : 'POST',
        data : data_send,
        beforeSend : function () {
            $('.loading-overflow, #loader').fadeIn(300);
            $('#deleteModal').modal('hide');
        },
        success : function (r) {
            if (r.success == 'fail') {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: 'May be have some error, we will fix it soon !'
                });
            }
            Swal.fire({
                type: 'success',
                title: 'item have deleted !',
                showConfirmButton: false,
                timer: 1500
            }).then( () => {
                window.location.reload(false);
            });
        },
        complete : function () {
            $('.loading-overflow, #loader').fadeOut(300);
        },
        error : function (e) {
            console.log(e);
            $('.loading-overflow, #loader').fadeOut(300);
        }
    });
});
$('#birth_day').datepicker({
    format: 'yyyy-mm-dd',
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true,
});
$('.oth-action-people').on('click', function () {
    console.log('kaka')
    $('#simple-form-people').submit();
});