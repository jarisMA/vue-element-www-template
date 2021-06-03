export const campMixin = {
  computed: {
    campStatus() {
      return ({ register_start_at, start_at }) => {
        const now = new Date().valueOf();
        const open = new Date(start_at).valueOf();
        const register = new Date(register_start_at).valueOf();
        if (now < register) {
          return 3; //敬请期待
        }
        if (now >= open) {
          return 2; // 开课了
        }
        if (now >= register) {
          return 1; // 开始报名了
        }
      };
    }
  }
};

import {
  goAcademyCourseList,
  goAcademySeriesList,
  goAcademyCampList
} from "utils/routes";

export const listMixin = {
  data() {
    return {
      value: 1,
      options: [
        {
          value: 1,
          label: "视频课"
        },
        {
          value: 2,
          label: "体系课"
        },
        {
          value: 3,
          label: "训练营"
        }
      ]
    };
  },
  methods: {
    handleOptionSelect(id) {
      switch (id) {
        case 1:
          goAcademyCourseList();
          break;
        case 2:
          goAcademySeriesList();
          break;
        case 3:
          goAcademyCampList();
          break;
        default:
          break;
      }
    }
  }
};
