// action add
$('.oth-simple-add').on('click', function () {
    // $('#simple-form-people')[0].reset();
    $('#simple-form-people').attr('action', window.location.origin + '/simple/add');
});
// action edit
$('.oth-simple-edit').on('click', function () {
    let id = $(this).attr('data-id');
    $('input[name=id]').val(id);
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
            $('.required').focusout();
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
    let flg = true;
    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let password = $('#password').val().trim();
    let confirm_password = $('#confirm-password').val().trim();
    let birth_day = $('#birth_day').val().trim();
    let image = $('#image').val().trim();
    let note = $('#note').val().trim();
    let gender = $('.gender:checked');
    if ( !name ) {
        $('#name').removeClass('is-invalid').addClass('is-invalid');
        $('#name').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#name').removeClass('is-invalid').addClass('is-valid');
        $('#name').parent().find('.invalid-feedback').fadeOut(300);
    }
    if ( !email || !validateEmail(email) ) {
        $('#email').removeClass('is-valid').addClass('is-invalid');
        $('#email').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#email').removeClass('is-invalid').addClass('is-valid');
        $('#email').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (!password) {
        $('#password').removeClass('is-valid').addClass('is-invalid');
        $('#password').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#password').removeClass('is-invalid').addClass('is-valid');
        $('#password').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (password !== confirm_password) {
        $('#confirm-password').removeClass('is-valid').addClass('is-invalid');
        $('#confirm-password').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#confirm-password').removeClass('is-invalid').addClass('is-valid');
        $('#confirm-password').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (!birth_day) {
        $('#birth_day').removeClass('is-valid').addClass('is-invalid');
        $('#birth_day').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#birth_day').removeClass('is-invalid').addClass('is-valid');
        $('#birth_day').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (!image) {
        $('#image').removeClass('is-valid').addClass('is-invalid');
        $('#image').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#image').removeClass('is-invalid').addClass('is-valid');
        $('#image').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (!note) {
        $('#note').removeClass('is-valid').addClass('is-invalid');
        $('#note').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#note').removeClass('is-invalid').addClass('is-valid');
        $('#note').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (gender.length == 0) {
        $('#gender').fadeIn(300);
        flg = false;
    } else {
        $('#gender').fadeOut(300);
    }
    if (flg) {
        $('#simple-form-people').submit();
    }
});
$('.required').on('keyup focusout', function () {
    let _this = $(this);
    console.log(_this.val())
    if ( !_this.val() ) {
        _this.removeClass('is-invalid').addClass('is-invalid');
        _this.parent().find('.invalid-feedback').fadeIn(300);
    } else {
        _this.removeClass('is-invalid').addClass('is-valid');
        _this.parent().find('.invalid-feedback').fadeOut(300);
    }
});
$('.email').on('keyup focusout', function () {
    let _this = $(this);
    if ( !_this.val() || !validateEmail(_this.val()) ) {
        _this.removeClass('is-invalid').addClass('is-invalid');
        _this.parent().find('.invalid-feedback').fadeIn(300);
    } else {
        _this.removeClass('is-invalid').addClass('is-valid');
        _this.parent().find('.invalid-feedback').fadeOut(300);
    }
});
$('.confirm-password').on('keyup focusout', function () {
    let _this = $(this);
    let confirm = _this.data('id');
    let val_confirm = $('#' + confirm).val();
    if ( !_this.val() || _this.val() != val_confirm ) {
        _this.removeClass('is-invalid').addClass('is-invalid');
        _this.parent().find('.invalid-feedback').fadeIn(300);
    } else {
        _this.removeClass('is-invalid').addClass('is-valid');
        _this.parent().find('.invalid-feedback').fadeOut(300);
    }
})
$('.oth-action-people-edit').on('click', function () {
    let flg = true;
    let name = $('#name_').val().trim();
    let email = $('#email_').val().trim();
    let password = $('#password_').val().trim();
    let confirm_password = $('#confirm-password_').val().trim();
    let birth_day = $('#birth_day_').val().trim();
    let note = $('#note_').val().trim();
    let gender = $('.gender_:checked');
    if ( !name ) {
        $('#name_').removeClass('is-invalid').addClass('is-invalid');
        $('#name_').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#name_').removeClass('is-invalid').addClass('is-valid');
        $('#name_').parent().find('.invalid-feedback').fadeOut(300);
    }
    if ( !email || !validateEmail(email) ) {
        $('#email_').removeClass('is-valid').addClass('is-invalid');
        $('#email_').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#email_').removeClass('is-invalid').addClass('is-valid');
        $('#email_').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (!password) {
        $('#password_').removeClass('is-valid').addClass('is-invalid');
        $('#password_').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#password_').removeClass('is-invalid').addClass('is-valid');
        $('#password_').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (password !== confirm_password) {
        $('#confirm-password_').removeClass('is-valid').addClass('is-invalid');
        $('#confirm-password_').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#confirm-password_').removeClass('is-invalid').addClass('is-valid');
        $('#confirm-password_').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (!birth_day) {
        $('#birth_day_').removeClass('is-valid').addClass('is-invalid');
        $('#birth_day_').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#birth_day_').removeClass('is-invalid').addClass('is-valid');
        $('#birth_day_').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (!note) {
        $('#note_').removeClass('is-valid').addClass('is-invalid');
        $('#note_').parent().find('.invalid-feedback').fadeIn(300);
        flg = false;
    } else {
        $('#note_').removeClass('is-invalid').addClass('is-valid');
        $('#note_').parent().find('.invalid-feedback').fadeOut(300);
    }
    if (gender.length == 0) {
        $('#gender_').fadeIn(300);
        flg = false;
    } else {
        $('#gender_').fadeOut(300);
    }
    if (flg) {
        $('#simple-form-people-edit').submit();
    }
})
formatDate = function (date) {
    date = new Date(date);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
  
    return year + '-' + month + '-' + day;
  }