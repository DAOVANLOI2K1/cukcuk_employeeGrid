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
for (let i = 1; i < document.querySelectorAll('table tr').length; i++) {
    document.querySelectorAll('table tr')[i].addEventListener('click', function() {
        this.classList.toggle('active');
    });
    document.getElementsByClassName('checkbox')
}