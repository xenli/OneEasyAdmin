<template>
  <div class="tags">
    <ul>
      <li
        class="tags-li"
        v-for="item in tagsList"
        :class="{ active: isActive(item) }"
        :key="item.menuIndexName"
        @click="changeTag(item)"
      >
        <span class="tags-li-title">{{ item.menuTitle }}</span>
        <span class="tags-li-icon" @click="closeTag(item)">
          <i style="font-size: 18px" class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown trigger="click">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item @click="closeOtherTag">关闭其他</el-dropdown-item>
            <el-dropdown-item @click="closeTagAll">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { IMenuItem } from "@/store";
//配合着用
@Options({
  computed: {},
  methods: {},
})
export default class Tags extends Vue {
  private FIndexTagItem: IMenuItem | undefined;
  private tagsList: IMenuItem[] = [];
  public created() {
    this.$myEvenBus._instance.on("changeTag", (qItem) => {
      this.FIndexTagItem = qItem as IMenuItem;
      this.tagsList = [];
      this.tagsList = store.state.tagsList.itemTags;
    });
  }
  private isActive(qItem: IMenuItem): boolean {
    if (this.FIndexTagItem == undefined) {
      return false;
    }
    return this.FIndexTagItem.menuIndexName == qItem.menuIndexName;
  }
  private changeTag(qItem: IMenuItem) {
    this.$myEvenBus.chageTag(qItem);
  }
  private closeTag(qItem: IMenuItem) {
    this.$myEvenBus.closeTag(qItem);
    //阻断上层控件click事件
    this.cancelBubble(window.event);
  }
  private closeOtherTag() {
    if (this.FIndexTagItem != undefined) {
      this.$myEvenBus.closeOtherTag(this.FIndexTagItem);
    }
  }
  private closeTagAll() {
    this.$myEvenBus.closeTagAll();
  }
  private cancelBubble(e: any) {
    var evt = e ? e : window.event;
    if (evt.stopPropagation) {
      //W3C
      evt.stopPropagation();
    } else {
      //IE
      evt.cancelBubble = true;
    }
  }
}
</script>

<style>
.tags {
  position: relative;
  height: 40px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 2px 2px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  min-width: 80px;
  margin: 3px 0px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  border: 1px solid #3bc0f5;
  background: #fff;
  padding: 0 0 0 5px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}
.tags-li-icon {
  width: 20px;
  float: right;
  margin-top: 3px;
}
.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  font-size: 15px;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  margin-top: 5px;
  text-align: center;
  width: 110px;
  height: 40px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
