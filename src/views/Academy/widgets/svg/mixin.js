export default {
  props: {
    draggable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    mousedown(e) {
      this.$emit("mousedown", e);
    }
  }
};
