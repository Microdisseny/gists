// When changing values using Javascript you don't get a onchange event
// Use this function to overcome the limitation
// Thanks to @copying

function addOnchangeProxy (el) {
  const oldDescriptor = Object.getOwnPropertyDescriptor(el.constructor.prototype, 'value');
  Object.defineProperty(el, 'value', {
    configurable: true,
    enumerable: true,
    get () {
      return oldDescriptor.get.call(this);
    },
    set (v) {
      oldDescriptor.set.call(this, v);
      // fire change event
      setTimeout(function () {
        if ("createEvent" in document) {
          const evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          el.dispatchEvent(evt);
        } else {
          el.fireEvent("onchange");
        }
      })
    }
  })
}
