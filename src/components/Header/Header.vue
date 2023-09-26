<template>
  <div class="headers" :class="{ headerBg: props.transparent }">
    <div class="left" @click="() => router.back()" v-if="!props.hidenLeft">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFsSURBVHgB7duBTcJQFIXhP07gCGcDHYERHIER3ABGcANWcANG0A0YAZ0A+wIYxd5eUlqV1/MlNyFNSsKfl6a8tGBmZmZmZjYpauYe+0HNrJvZHWZzOGbsQ5Qgu5NZY2Gc40ya6I6zYcJEd5wySyZKOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IXB7ntplZMw9UuFF2aRydfEf5XM2264Jh43yNdPXEOHGOI67cnPHiVBHoifYftjrj3CzOnwa6YRh3wfFnus3456tjqEBv9NP3vF8zVKD34Pgj3V4PU7058fVjkZwrJnCRLne/W8aLJCqwpHsV9I1UxY1iUVbRC8NGKquyqic8RH49ySIV5Y/qnH306ohhIlVNOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJK5JGyncnqie5IW8yvIpxDtEdaYZ/E90hr/DpUq7LVKszMzMzMzOrzAc5NpNnqQnlVAAAAAElFTkSuQmCC"
        alt="" srcset="" />
    </div>
    <span>{{ props.title }}</span>
    <slot name="title"></slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCustomRouter } from 'src/hook'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    transparent: {
      type: Boolean,
      default: () => false,
    },
    hidenLeft: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    const router = useCustomRouter();
    return { props, router };
  },
});
</script>
<style scoped lang="scss">
.headerBg {
  background: none !important;
}

.headers {
  width: 100%;
  height: 44px;
  background: white;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 3px;
  top: 0;
  left: 0;
  font-size: 16px;
  font-weight: 600;
  z-index: 20;
  box-shadow: 0 2px 8px #f2f3f5;

  .left {
    position: absolute;
    left: 13px;

    img {
      width: 28px;
    }
  }

  .right {
    position: absolute;
    right: 3px;
  }
}
</style>
