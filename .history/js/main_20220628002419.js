// click arrow combobox
document.querySelector('.combo_box .icon').addEventListener('click', function(e) {
    this.classList.toggle('active');
    document.getElementsByClassName('option')[1].classList.remove('active');
    document.getElementsByClassName('option')[0].classList.remove('active');
});
// click option drop combobox
document.getElementsByClassName('option')[0].addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementsByClassName('option')[1].classList.remove('active');
    document.getElementById('input') = 
});
document.getElementsByClassName('option')[1].addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementsByClassName('option')[0].classList.remove('active');
});
let text = document.getElementById('input');
console.log(text.value);