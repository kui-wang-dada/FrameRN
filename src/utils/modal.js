// 弹出层的调用方法
// 当前仅涉及到YModal
let instance = null;

export default {
  
  setInstance(ref) {
    instance = ref;
  },
  show(component, type) {
    instance.show(component, type);
  },
  showToast(component, func) {
    instance.showToast(component, func);
  },
  close() {
    instance.close();
  }
};
