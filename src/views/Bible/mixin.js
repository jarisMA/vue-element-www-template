export const detailMixin = {
  computed: {
    getDepth() {
      return (arr, len) => {
        var flag = false;
        var temp = [];
        for (let i = 0; i < arr.length; i++) {
          let isArr =
            Object.prototype.toString.call(arr[i].children) == "[object Array]";
          if (isArr) {
            for (let j = 0; j < arr[i].children.length; j++) {
              temp.push(arr[i].children[j]);
            }
            flag = true;
          }
        }
        if (flag) {
          len++;
          return this.getDepth(temp, len);
        } else {
          return len;
        }
      };
    }
  }
};
