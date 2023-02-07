// 菜单展开
const menu_btn = document.getElementById('menu');
menu_btn.addEventListener('click', () => {
    if(menu_btn.classList.contains('active')) {
        menu_btn.classList.remove('active');
    } else {
        menu_btn.classList.add('active');
    }
});
// scroll reveal
const revealElements = document.querySelectorAll('[data-reveal]');
const scrollReveal = function() {
    len = revealElements.length;
    for(var i = 0; i < len; i++) {
        const isOnScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight;
        if(isOnScreen) {
            revealElements[i].classList.add('show');
        } else {
            revealElements[i].classList.remove('show');
        }
    }
}
window.addEventListener("scroll", scrollReveal);
// scroll top
const content = document.querySelector('div.body');
const content_menu = document.querySelector('div.menu');
const scrollTop = function() {
    const isOnTop = document.documentElement.scrollTop > (content.offsetTop + 30) ;
    if(isOnTop) {
        content_menu.classList.add('show');
    } else {
        content_menu.classList.remove('show');
    }
}
window.addEventListener("scroll", scrollTop);