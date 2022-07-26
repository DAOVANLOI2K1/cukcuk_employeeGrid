// select table
for (let i = 1; i < document.querySelectorAll('table tr').length; i++) {
    document.getElementsByClassName('checkbox')[i-1].addEventListener('click', function(e) {
        document.querySelectorAll('table tr')[i].classList.toggle('active');
    });
}

let tag = $(".container");
console.log(tag);