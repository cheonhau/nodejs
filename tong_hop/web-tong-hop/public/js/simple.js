// action add
$('.oth-simple-add').on('click', function () {
    $('#simple-form-people')[0].reset();
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
    // ajax de xoa
});
$('#birth-day').datepicker({
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