// click arrow combobox
document.querySelector('.combo_box > .icon').addEventListener('click', function(e) {
    this.classList.toggle('active');\
    document.getElementsByClassName('options_dropdown').classList
});
let hv = document.getElementsByClassName('options_dropdown');
console.log(hv);
