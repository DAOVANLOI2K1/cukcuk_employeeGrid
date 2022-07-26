// click arrow combobox
document.querySelector('.combo_box > .icon').addEventListener('click', function(e) {
    this.classList.toggle('active');
    document.getElementsByClassName('.options_dropdown').style.opacity = '1';
    document.getElementsByClassName('.options_dropdown').style.visibil = '1';
});
