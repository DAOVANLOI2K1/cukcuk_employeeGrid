// click arrow combobox
document.querySelector('.combo_box .icon').addEventListener('click', function(e) {
    this.classList.toggle('active');
});
// click option drop combobox
document.getElementsByClassName('option')[0].addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementsByClassName('option')[1].classList.re
});
document.getElementsByClassName('option')[1].addEventListener('click', function() {
    this.classList.toggle('active');
});