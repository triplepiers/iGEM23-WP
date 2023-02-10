const t1 = document.querySelectorAll('.fold');
const clear_t1 = () => {
    t1.forEach(item => item.classList.remove('selected'));
}
t1.forEach(item => item.addEventListener('click', () => {
    clear_t1();
    item.classList.add('selected');
}))

const t_menus = document.querySelectorAll('.scroll');
t_menus.forEach(item => item.addEventListener('click', () => {
    console.log(`t_${item.id}`);
    document.getElementById(`t_${item.id}`).scrollIntoView(true);
}));

const side_menu_btn = document.querySelector(".menu .btn");
const side_menu = document.querySelector(".menu");
side_menu_btn.addEventListener('click', () => {
    console.log("hello")
    if(side_menu.classList.contains("taylor")) {
        side_menu.classList.remove("taylor");
    } else {
        side_menu.classList.add("taylor");
    }
})