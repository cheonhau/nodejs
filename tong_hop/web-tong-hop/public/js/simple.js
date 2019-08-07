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
    $('#simple-form-people').modal('show');
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
})