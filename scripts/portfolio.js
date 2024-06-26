//It adds arrow-pointer icons when the device screen size less than 480 px

function page () {
    let nav = document.querySelector('.main__content-nav');
    let next = nav.querySelector('#next');
    let back = nav.querySelector('#back');
    if (document.documentElement.clientWidth <= 480) {
        if (next) {
            next.innerHTML = "<div class='content__nav-item'><svg class='nav__item-pic'><use xlink:href='img/sprite-icons.svg#next'></use></svg></div>"
        }
        if (back) {
            back.innerHTML = "<div class='content__nav-item'><svg class='nav__item-pic'><use xlink:href='img/sprite-icons.svg#back'></use></svg></div>"
        }
        
    } else {
        if (next) {
            next.innerHTML= '';
            next.textContent = 'Следующий раздел ->';
        }
        if (back) {
            back.innerHTML= '';
            back.textContent = '<- Предыдущий раздел';
        }
        
    }
}
window.addEventListener('resize', page);

