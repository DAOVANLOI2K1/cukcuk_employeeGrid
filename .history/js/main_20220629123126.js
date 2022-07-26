// click arrow combobox
document.querySelector('.combo_box .icon').addEventListener('click', function(e) {
    this.classList.toggle('active');
    document.getElementsByClassName('option')[1].classList.remove('active');
    document.getElementsByClassName('option')[0].classList.remove('active');
});
// click option drop combobox
document.getElementsByClassName('option')[0].addEventListener('click', function() {
    this.classList.add('active');
    document.getElementsByClassName('option')[1].classList.remove('active');
    document.getElementById('input').value = 'Trạng thái 1';
});
document.getElementsByClassName('option')[1].addEventListener('click', function() {
    this.classList.add('active');
    document.getElementsByClassName('option')[0].classList.remove('active');
    document.getElementById('input').value = 'Trạng thái 2';
});
// select table
// for (let i = 1; i < document.querySelectorAll('table tr').length; i++) {
//     document.getElementsByClassName('.checkbox')[i-1].addEventListener('click', function() {
//         document.querySelectorAll('table tr')[i].classList.toggle('active');
//     });
// }
document.getElementsByClassName('action').onclick = function(e){
    if (this.checked){
        alert("Bạn vừa thích freetuts.net");
    }
    else{
        alert("Bạn vừa bỏ thích freetuts.net");
    }
};