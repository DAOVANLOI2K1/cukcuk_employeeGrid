// click arrow combobox
document.querySelector('.combo_box > .icon').addEventListener('click', function(e) {
    this.classList.toggle('active');\
    document.getElementsByClassName('options_dropdown').classList.toggle('appear')
});
let hv = document.getElementsByClassName('options_dropdown');
console.log(hv);