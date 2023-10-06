<template>
    <div class="time-filter">
        <div class="flex items-center content-start" @click="showTimeActionSheet = true">
            <span>{{ showText }}</span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAMCAMAAABRJ730AAAAAXNSR0IArs4c6QAAAFFQTFRFAAAAAAAAADMzICAgFSoqICAwGCQxHScxGCgwHycuISc0HSUyHScyHCYxHiYyHiYyHCYyHiYyHicyHiYzHSYyHiYyHSYyHSYxHSYyHSYyHSYy9rci9QAAABp0Uk5TAAMFCAwQFRogISd7j6qztL29xs7W2N3j9Pkw4zOlAAAAV0lEQVQYGWXBBxJAMABFwUf0Lvq//0EZQ4ZkF+pDnqMGdgV2oFGgAaJWnjbiEvf66WJuZtTHYHgkVo5NcNJJjynlI5t1mzN+8lWXNcdTbtJWEKiWpeJ1AiX9DtRfGaQgAAAAAElFTkSuQmCC"
                alt="">
        </div>
        <van-action-sheet v-model:show="showTimeActionSheet" :actions="actionSheet" cancel-text="取消" teleport="body"
            close-on-click-action @select="onSelect" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    emits: ['change'],
    setup(_, { emit }) {
        const time = ref(0)
        const showTimeActionSheet = ref(false)

        const filterMap: any = {
            0: '最近一周',
            1: '最近二周',
            2: '最近三周',
            3: '最近一个月',
            4: '最近三个月',
            5: '最近六个月'
        }
        const actionSheet = computed(() => Object.keys(filterMap).map(item => ({ name: filterMap[item], value: item, color: Number(item) === time.value ? '#fcdf6b' : '#303133' })))
        const showText = computed((() => filterMap[time.value]))

        const onSelect = (action: any) => {
            time.value = Number(action.value)
            emit('change', getTimeRange(Number(action.value), new Date()))
        }

        function getTimeRange(timeUnit: any, date: any) {
            const startTime = new Date(date.getTime());
            const endTime = new Date(date.getTime());

            switch (timeUnit) {
                case 0:
                    startTime.setDate(endTime.getDate() - 6);
                    return [formatDate(startTime), formatDate(endTime)];
                case 1:
                    startTime.setDate(endTime.getDate() - 13);
                    return [formatDate(startTime), formatDate(endTime)];
                case 2:
                    startTime.setDate(endTime.getDate() - 20);
                    return [formatDate(startTime), formatDate(endTime)];
                case 3:
                    startTime.setMonth(endTime.getMonth() - 1);
                    startTime.setDate(1);
                    endTime.setDate(0);
                    return [formatDate(startTime), formatDate(endTime)];
                case 4:
                    startTime.setMonth(endTime.getMonth() - 3);
                    startTime.setDate(1);
                    endTime.setDate(0);
                    return [formatDate(startTime), formatDate(endTime)];
                case 5:
                    startTime.setMonth(endTime.getMonth() - 6);
                    startTime.setDate(1);
                    endTime.setDate(0);
                    return [formatDate(startTime), formatDate(endTime)];
                default:
                    return null;
            }
        }

        function formatDate(date: any) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const timeString = '00:00:00';
            return `${year}-${month}-${day} ${timeString}`;
        }

        return { time, showText, showTimeActionSheet, actionSheet, onSelect }
    }
})
</script>

<style lang="scss" scoped>
.time-filter {
    font-size: 16px;
    font-weight: 500;
    padding: 15px;

    img {
        width: 10px;
        height: 6px;
        margin-left: 10px;
    }
}
</style>