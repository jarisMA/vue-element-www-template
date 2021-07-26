<template>
  <div class="page">
    <Course
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
import courseService from "service/course";
import Course from "components/Course/Course";

export default {
  name: "SeriesCourse",
  components: { Course },
  data() {
    return {
      detail: {},
      chapters: [],
      chapterId: null,
      sectionId: null,
      activeChapterIndex: 0,
      activeSectionIndex: 0,
      setRecording: false
    };
  },
  watch: {
    ["$route"](val, oldVal) {
      if (
        val.params.seriesId != oldVal.params.seriesId ||
        val.params.chapterId != oldVal.params.chapterId
      ) {
        const { chapterId } = this.$route.params;
        this.chapterId = chapterId;
        this.getData();
      } else {
        const { sectionId } = val.params;
        this.sectionId = sectionId;
        this.setActiveIndex();
      }
    }
  },
  created() {
    const { chapterId, sectionId } = this.$route.params;
    this.chapterId = chapterId;
    this.sectionId = sectionId;
    this.getData();
  },
  methods: {
    getData() {
      courseService
        .setChapter(this.$route.params.seriesId, this.chapterId)
        .then(res => {
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
      this.chapters.some((chapter, cIndex) => {
        if (chapter.id == this.chapterId) {
          this.activeChapterIndex = cIndex;
          chapter.sections.some((section, sIndex) => {
            if (section.id == this.sectionId) {
              this.activeSectionIndex = sIndex;
              return true;
            }
          });
          return true;
        }
      });
    },
    handleSetRecord(params) {
      const {
        chapters,
        setRecording,
        activeChapterIndex,
        activeSectionIndex,
        chapterId,
        sectionId
      } = this;
      const section = chapters[activeChapterIndex].sections[activeSectionIndex];
      if (!setRecording) {
        this.setRecording = true;
        courseService
          .setSeriesSectionRecord(
            this.$route.params.seriesId,
            chapterId,
            sectionId,
            params
          )
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
    handleToggle(chapterIndex, sectionIndex) {
      this.$router.push({
        params: {
          ...this.$route.params,
          chapterId: this.chapters[chapterIndex].id,
          sectionId: this.chapters[chapterIndex].sections[sectionIndex].id
        }
      });
    },
    handleEnded() {
      const { chapterId, sectionId } = this;
      courseService.setSeriesSectionFinish(
        this.$route.params.seriesId,
        chapterId,
        sectionId
      );
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
