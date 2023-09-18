<template>
  <div>
    <div class="header" :style="y > 5 ? { position: 'fixed' } : { position: 'relative' }">
      <span class="left" @click="back">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFsSURBVHgB7duBTcJQFIXhP07gCGcDHYERHIER3ABGcANWcANG0A0YAZ0A+wIYxd5eUlqV1/MlNyFNSsKfl6a8tGBmZmZmZjYpauYe+0HNrJvZHWZzOGbsQ5Qgu5NZY2Gc40ya6I6zYcJEd5wySyZKOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IOE5IXB7ntplZMw9UuFF2aRydfEf5XM2264Jh43yNdPXEOHGOI67cnPHiVBHoifYftjrj3CzOnwa6YRh3wfFnus3456tjqEBv9NP3vF8zVKD34Pgj3V4PU7058fVjkZwrJnCRLne/W8aLJCqwpHsV9I1UxY1iUVbRC8NGKquyqic8RH49ySIV5Y/qnH306ohhIlVNOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJKOFJK5JGyncnqie5IW8yvIpxDtEdaYZ/E90hr/DpUq7LVKszMzMzMzOrzAc5NpNnqQnlVAAAAAElFTkSuQmCC"
          alt="" srcset="" />
      </span>
      <span class="center inter-bold">{{ title }}</span>
      <span class="right">
        <slot></slot>
      </span>
    </div>
    <div class="pl" :style="y > 5 ? { display: 'block' } : { display: 'none' }"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useCustomRouter } from 'src/hook';
import { useWindowScroll } from '@vueuse/core';

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
    customBackEvent: {
      type: Function as PropType<any>,
    }
  },
  emits: ['back'],
  setup(props, { emit }) {
    const router = useCustomRouter();
    const { y } = useWindowScroll();
    const back = () => {
      if (props.customBackEvent) {
        props.customBackEvent()
      } else {
        emit('back')
        router.back();
      }
    }
    return {
      y,
      back
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 0 20px;
  height: 44px;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: white;
  z-index: 10;
  transition: all ease-out 0.3s;
  box-shadow: 0 2px 8px #f2f3f5;

  .left {
    width: 50px;

    img {
      width: 28px;
    }
  }

  .center {
    flex: 1;
    color: $title;
    font-size: 18px;
    text-align: center;
  }

  .right {
    width: 50px;
    text-align: right;
  }
}

.pl {
  width: 100%;
  height: 44px;
  background-color: transparent;
  transition: all ease-out 0.3s;
}
</style>
