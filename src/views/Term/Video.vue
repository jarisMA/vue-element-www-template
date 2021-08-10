<template>
  <div class="page" v-loading="loading">
    <camp-course
      v-if="!loading"
      :course="detail"
      :courseChapters="widgets"
      :chapterIndex="activeWidgetIndex"
      :sectionIndex="activeResourceIndex"
      :next="nextLesson"
      @setRecord="handleSetRecord"
      @toggle="handleToggle"
      @ended="handleEnded"
      @next="handleNext"
    />
  </div>
</template>

<script>
import termService from "service/term";
import CampCourse from "components/Course/CampCourse";
// import { goHome } from "utils/routes";

export default {
  name: "CampTermVideo",
  components: { CampCourse },
  data() {
    return {
      loading: true,
      detail: {},
      widgets: [],
      widgetId: null,
      resourceId: null,
      setRecording: false,
      activeWidgetIndex: 0,
      activeResourceIndex: 0,
      nextLesson: null
    };
  },
  watch: {
    ["$route"](val, oldVal) {
      if (val.params.termId != oldVal.params.termId) {
        this.getCourse();
      } else {
        const { widgetId, resourceId } = val.params;
        this.widgetId = widgetId;
        this.resourceId = resourceId;
        this.setActiveIndex();
      }
    }
  },
  created() {
    const { widgetId, resourceId } = this.$route.params;
    this.widgetId = widgetId;
    this.resourceId = resourceId;
    this.getCourse();
  },
  methods: {
    getCourse() {
      const id = this.$route.params.termId;
      this.loading = true;
      termService
        .campTermVideoCat(id)
        .then(res => {
          this.detail = res.term;
          this.widgets = res.widgets.map(item => {
            return {
              ...item,
              sections: item.resources
            };
          });
          this.setActiveIndex();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setActiveIndex() {
      this.widgets.some((widget, wIndex) => {
        if (widget.id == this.widgetId) {
          this.activeWidgetIndex = wIndex;
          widget.resources.some((resource, sIndex) => {
            if (resource.widget_resource_id == this.resourceId) {
              this.activeResourceIndex = sIndex;
              return true;
            }
          });
          return true;
        }
      });
      this.setNextLesson();
    },
    setNextLesson() {
      this.nextLesson = null;
      this.widgets.some((widget, wIndex) => {
        if (wIndex == this.activeWidgetIndex) {
          widget.resources.some((resource, sIndex) => {
            if (this.activeResourceIndex + 1 == sIndex) {
              this.nextLesson = resource;
              return true;
            }
          });
          if (this.nextLesson) {
            return true;
          }
        }
        if (!this.nextLesson && wIndex == this.activeWidgetIndex + 1) {
          this.nextLesson = widget.resources[0];
          return true;
        }
      });
    },
    handleSetRecord(params) {
      const {
        widgets,
        activeWidgetIndex,
        activeResourceIndex,
        setRecording
      } = this;
      const widget = widgets[activeWidgetIndex];
      const resource = widget.resources[activeResourceIndex];
      if (!setRecording) {
        this.setRecording = true;
        termService
          .campTermWidgetResourceRecord(
            resource.camp_id,
            resource.term_id,
            resource.widget_id,
            resource.widget_resource_id,
            params
          )
          .then(() => {
            this.$set(
              widgets[activeWidgetIndex].resources,
              activeResourceIndex,
              {
                ...resource,
                play_second_duration:
                  resource.play_second_duration -
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
    handleToggle(widgetIndex, resourceIndex) {
      this.$router.push({
        params: {
          ...this.$route.params,
          widgetId: this.widgets[widgetIndex].id,
          resourceId: this.widgets[widgetIndex].resources[resourceIndex]
            .widget_resource_id
        }
      });
    },
    handleEnded() {
      // const { widgets, activeWidgetIndex, activeResourceIndex } = this;
      // const widget = widgets[activeWidgetIndex];
      // const resource = widget.resources[activeResourceIndex];
      // termService.campTermWidgetResourceFinish(
      //   resource.camp_id,
      //   resource.term_id,
      //   resource.widget_id,
      //   resource.widget_resource_id
      // );
    },
    handleNext() {
      const { widget_id, widget_resource_id } = this.nextLesson;
      this.$router.push({
        params: {
          ...this.$route.params,
          widgetId: widget_id,
          resourceId: widget_resource_id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
