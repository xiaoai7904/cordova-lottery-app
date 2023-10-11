<template>
    <div class="bet-item-container">
        <div v-for="(item, index) in betAreaMap" :key="index" class="bet-item">
            <h2>{{ item.name }}</h2>
            <div class="bet-item-content flex-start">
                <!-- <p>
                比<br />分
                </p> -->
                <div class="grid">
                    <p v-for="(item1, index1) in item.betName" :key="index1"
                        @click="select({ name: item1, value: getBetValue(data[index], index1), code: index, playCode: item.betCode[index1], matchId: data.id, })"
                        :class="{ 'active': betNames.includes(`${data.matchId}_${index}_${item1}`) }">
                        <span>{{ item1 }}</span>
                        <span>{{ getBetValue(data[index], index1) }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
import { betNameMap, BET_TYPE, footBallOdds, baskteBallOdds } from 'src/common'
import { useBet } from 'src/hook'
import { computed } from 'vue';
import { watch } from 'vue';

export default defineComponent({
    props: {
        type: {
            type: String as PropType<string>,
            default: ''
        },
        data: {
            type: Object as PropType<Record<string, string>>,
            default: () => ({})
        },
        checkData: {
            type: Array as PropType<Record<string, string>[]>,
            default: () => ([])
        },
        betType: {
            type: Number as PropType<number>,
            default: 1
        }
    },
    emits: ['bet'],
    setup(props, { emit }) {
        const betStore = reactive({
            betList: [] as any[]
        })

        const { getBetValue } = useBet();

        const betNames = computed(() => betStore.betList.map(item => props.data.matchId + '_' + item.code + '_' + item.name))
        const betAreaMap = computed(() => {
            if (props.type) {
                return { [props.type]: betNameMap[props.type] }
            }

            if (props.betType === BET_TYPE.FOOTEBALL) {
                const result: any = {}
                footBallOdds.forEach(item => {
                    result[item] = betNameMap[item]
                })

                return result
            }

            const result: any = {}
            baskteBallOdds.forEach(item => {
                result[item] = betNameMap[item]
            })

            return result

        })

        const select = (item: any) => {
            if (betStore.betList.map((v: any) => `${v.code}_${v.name}`).includes(`${item.code}_${item.name}`)) {
                betStore.betList = betStore.betList.filter((v: any) => v.name !== item.name && v.code !== item.code)
            } else {
                betStore.betList.push(item)
            }

            emit('bet', betStore.betList)
        }

        watch(() => props.checkData, newValue => {
            if (newValue && newValue.length) {
                betStore.betList = [...newValue]
            }
        }, {
            immediate: true
        })

        return { betNames, betAreaMap, getBetValue, select }
    }
})
</script>

<style scoped lang="scss">
.bet-item {
    font-size: 12px;
    padding: 15px 15px 0 15px;

    &-container {
        padding: 15px 0;
    }

    >h2 {
        font-size: 12px;
        color: #232a24;
        margin-bottom: 10px;
        font-weight: 500;
    }



    &-content {
        // border: 0.5px solid #efeff4;
        flex-direction: row;
        // padding: 15px 0;

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
                background-color: #fff853;
                border-color: #fff;
            }

            >p {
                border: 1px solid #efeff4;
                margin-left: -1px;
                margin-top: -1px;
                // height: 35px;
                padding: 2px 0;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                >span:last-child {
                    color: #77838d;
                }
            }
        }
    }

}
</style>
