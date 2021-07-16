<template>
  <div class="page">
    <course
      :course="detail"
      :courseChapters="chapters"
      :chapterIndex="activeChapterIndex"
      :sectionIndex="activeSectionIndex"
      @toggle="handleToggle"
      @setRecord="handleSetRecord"
      @ended="handleEnded"
    />
  </div>
</template>

<script>
import Course from "components/Course/Course";
import courseService from "service/course";
import { goHome } from "utils/routes";

export default {
  name: "AcademyCourseVideo",
  components: { Course },
  data() {
    return {
      detail: {},
      chapters: [],
      courseId: null,
      lessonId: null,
      activeChapterIndex: 0,
      activeSectionIndex: 0
    };
  },
  watch: {
    ["$route"](val, oldVal) {
      if (val.params.courseId != oldVal.params.courseId) {
        this.getData();
      } else {
        const { courseId, lessonId } = val.params;
        this.courseId = courseId;
        this.lessonId = lessonId;
        this.setActiveIndex();
      }
    }
  },
  created() {
    const { courseId, lessonId } = this.$route.params;
    this.courseId = courseId;
    this.lessonId = lessonId;
    this.getData();
  },
  methods: {
    getData() {
      courseService.course(this.$route.params.courseId).then(res => {
        if (!res.permission) {
          this.$notice({
            type: "warning",
            title: "暂无权限"
          });
          return goHome();
        }
        this.detail = res;
        this.chapters = [
          {
            id: res.id,
            title: res.name,
            sections: res.lessons
          }
        ];
        this.setActiveIndex();
      });
    },
    setActiveIndex() {
      this.chapters[0].sections.some((section, index) => {
        if (section.id == this.lessonId) {
          this.activeSectionIndex = index;
          return true;
        }
      });
    },
    handleToggle(courseIndex, lessonIndex) {
      this.$router.push({
        params: {
          ...this.$route.params,
          courseId: this.chapters[courseIndex].id,
          lessonId: this.chapters[courseIndex].sections[lessonIndex].id
        }
      });
    },
    handleSetRecord(params) {
      const {
        chapters,
        setRecording,
        activeChapterIndex,
        activeSectionIndex,
        courseId,
        lessonId
      } = this;
      const section = chapters[activeChapterIndex].sections[activeSectionIndex];
      if (!setRecording) {
        this.setRecording = true;
        courseService
          .setLessonRecord(courseId, lessonId, params)
          .then(() => {
            this.$set(
              chapters[activeChapterIndex].sections,
              activeSectionIndex,
              {
                ...section,
                play_second_duration:
                  section.play_second_duration -
                  0 +
                  (params.second_duration - 0)
              }
            );
          })
          .finally(() => {
            this.setRecording = false;
          });
      }
    },
    handleEnded() {
      const { courseId, lessonId } = this;
      courseService.setLessonFinish(courseId, lessonId);
    }
  }
};
</script>

<style lang="less" scoped></style>
