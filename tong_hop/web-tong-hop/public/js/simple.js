// action add
$('.oth-simple-add').on('click', function () {
    // $('#simple-form-people')[0].reset();
    $('#simple-form-people').attr('action', window.location.origin + '/simple/add');
});
// action edit
$('.oth-simple-edit').on('click', function () {
    let id = $(this).attr('data-id');
    $('input[name=_id]').val(id);
    // ajax de lay thong tin show len form
    let data_send = {id : id};
    console.log(data_send)
    let url  = window.location.origin + '/simple/one'
    $.ajax({
        url : url,
        method : 'POST',
        data : data_send,
        beforeSend : function () {
            $('.loading-overflow, #loader').fadeIn(300);
        },
        success : function (r) {
            let simple = r.simple;
            let image = simple.image;
            let gender = simple.gender;
            console.log(simple)
            $('#name_').val(simple.name);
            $('#email_').val(simple.email);
            $('#birth_day_').datepicker("getDate");
            $('#birth_day_').val(formatDate(simple.birth_day));
            $('#note_').val(simple.note);
            if (gender == "female") {
                $('#female_').prop('checked', true);
            } else {
                $('#male_').prop('checked', true);
            }
            
        },
        complete : function () {
            $('.loading-overflow, #loader').fadeOut(300);
            $('#ActionModalEdit').modal('show');
        },
        error : function (e) {
            console.log(e);
            $('.loading-overflow, #loader').fadeOut(300);
        }
    });
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
$('#birth_day, #birth_day_').datepicker({
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
$('.oth-action-people-edit').on('click', function () {
    $('#simple-form-people-edit').submit();
})
formatDate = function (date) {
    date = new Date(date);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
  
    return year + '-' + month + '-' + day;
  }