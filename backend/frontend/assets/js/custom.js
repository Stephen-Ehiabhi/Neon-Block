const burger = document.querySelect­or('.burger');
const menu = document.querySelect­or('.navlinks');


burger.addEventListe­ner('click',()=>{
   menu.classList.toggle('nav-active');
})
 