export default {
    bind: function(el, binding, vnode) {
        // console.log('vnode : ', vnode)
    },
    update: function(el, binding, vnode, oldVnode) {
        // if(document.activeElement === el){
        //   // console.log("update")
        //   // vnode.context.$emit("focused",el)
        //   console.log(el.offsetTop)
        //   console.log(el.closest(".body-component"))
        // }
    },
    // When the bound element is inserted into the DOM...
    inserted: function(el) {
        el.addEventListener('focus', inputFocused);
    }
};

function inputFocused(e) {
    setTimeout(() => {
        let targetElement = e.target;
        let bodyElement = e.target.closest('.body-component');

        bodyElement.scroll({
            top: targetElement.getBoundingClientRect().top - bodyElement.offsetTop - 15 + bodyElement.scrollTop,
            left: 0,
            behavior: 'smooth'
        });
    }, 300);
}
