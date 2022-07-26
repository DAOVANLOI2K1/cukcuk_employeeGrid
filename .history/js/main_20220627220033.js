// click arrow combobox
document.querySelector('.combo_box > .icon').addEventListener('click', function(e) {
    this.classList.toggle('active');
    document.getElementsByClassName('options-dropdown').style.opacity = '1';
    document.getElementsByClassName('options-dropdown').style.visibility = 'visible';
});
