<template>
  <div class="page">
    <Course
      :course="detail"
      :courseLessons="lessons"
      @setRecord="setLessonRecord"
    />
  </div>
</template>

<script>
import courseService from "service/course";
import Course from "components/Course/Course";
import { goHome } from "utils/routes";

export default {
  name: "CampTermVideo",
  components: { Course },
  data() {
    return {
      detail: {},
      lessons: [],
      setRecording: false
    };
  },
  watch: {
    ["$route"](val, oldVal) {
      if (
        val.params.id !== oldVal.params.id ||
        val.params.courseId !== oldVal.params.courseId
      ) {
        this.getCourse();
      }
    }
  },
  created() {
    this.getCourse();
  },
  methods: {
    getCourse() {
      const id = this.$route.params.id || this.$route.params.courseId;
      courseService.course(id).then(res => {
        if (!res.permission) {
          this.$notice({
            type: "warning",
            title: "暂无权限"
          });
          return goHome();
        }
        this.detail = res;
        this.lessons = res.lessons;
      });
    },
    setLessonRecord(activeLessonIndex, params) {
      const { lessons, setRecording } = this;
      const lesson = lessons[activeLessonIndex];
      if (!setRecording) {
        this.setRecording = true;
        const id = this.$route.params.id || this.$route.params.courseId;
        courseService
          .setLessonRecord(id, lesson.id, params)
          .then(() => {
            this.$set(lessons, activeLessonIndex, {
              ...lesson,
              play_second_duration:
                lesson.play_second_duration - 0 + (params.second_duration - 0)
            });
          })
          .finally(() => {
            this.setRecording = false;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
