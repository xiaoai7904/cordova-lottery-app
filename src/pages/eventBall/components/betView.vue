<template>
    <div>
        <div class="bet-item">
            <h2>比分</h2>
            <div class="bet-item-content flex-start">
                <!-- <p>
                比<br />分
                </p> -->
                <div class="grid">
                    <p @click="select({ name: '1:0', value: '10.50' })" :class="{ 'active': betNames.includes('1:0') }">
                        <span>1:0</span>
                        <span>10.50</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
import { betNameMap } from 'src/common'
import { computed } from 'vue';

export default defineComponent({
    props: {
        type: {
            type: String as PropType<string>,
            default: ''
        },
        data: {
            type: Object as PropType<Record<string, string>>,
            default: () => ({})
        }
    },
    emits: ['bet'],
    setup(props, { emit }) {
        const betStore = reactive({
            betList: [] as any[]
        })

        const betNames = computed(() => betStore.betList.map(item => item.name))
        const select = (item: any) => {
            if (betStore.betList.map((v: any) => v.name).includes(item.name)) {
                betStore.betList = betStore.betList.filter((v: any) => v.name !== item.name)
            } else {
                betStore.betList.push(item)
            }

            emit('bet', betStore.betList)
        }

        return { betNames, select }
    }
})
</script>

<style scoped lang="scss">
.bet-item {
    font-size: 12px;
    padding: 15px;

    >h2 {
        font-size: 12px;
        color: #232a24;
        margin-bottom: 10px;
    }



    &-content {
        // border: 0.5px solid #efeff4;
        flex-direction: row;


        >p {
            background-color: rgba(255, 248, 83, .65);
            border-left: 1px solid #efeff4;
            border-top: 1px solid #efeff4;
            border-bottom: 1px solid #efeff4;
            width: 20px;
            height: 100%;
        }

        >div {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(55px, 5fr));
            flex: 1;

            .active {
                background-color: #fff120;
                border-color: #fff120;
            }

            >p {
                border: 1px solid #efeff4;
                margin-left: -1px;
                margin-top: -1px;
                height: 35px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                >span:last-child {
                    color: #77838d;
                    margin-top: 5px;
                }
            }
        }
    }

}
</style>