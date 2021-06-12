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

export default {
  name: "SeriesCourse",
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
        val.params.seriesId !== oldVal.params.seriesId ||
        val.params.courseId !== oldVal.params.courseId
      ) {
        this.getData();
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      courseService
        .setChapter(this.$route.params.seriesId, this.$route.params.courseId)
        .then(res => {
          this.detail = res;
          this.lessons = res.lessons;
        });
    },
    setLessonRecord(activeLessonIndex, params) {
      const { lessons, setRecording } = this;
      const lesson = lessons[activeLessonIndex];
      if (!setRecording) {
        this.setRecording = true;
        courseService
          .setSeriesSectionRecord(
            this.$route.params.seriesId,
            this.$route.params.courseId,
            lesson.id,
            params
          )
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
