export default {
    bind: function (el, binding, vnode) {
    },
    update: function (el, binding, vnode, oldVnode) {
       
    },
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
        el.addEventListener('keyup', (e) => {
            e.target.value = e.target.value.replace(/[\u0660-\u0669]/g, function (c) {
                return c.charCodeAt(0) - 0x0660;
            }).replace(/[\u06f0-\u06f9]/g, function (c) {
                return c.charCodeAt(0) - 0x06f0;
            });
            e.target.dispatchEvent(new Event('input'));
        });
        // console.log(el.value);
    }
};

