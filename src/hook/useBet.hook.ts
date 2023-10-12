import { reactive, computed, onMounted } from 'vue';
import { betNameMap, XA_DEL_BET, Utils, BET_TYPE } from 'src/common';
import { useMatch, useNotify } from 'src/hook';

// 默认单注金额
const defaultBetAmount = 2;

const betStore = reactive({
  betInfo: {} as any,
});

export function useBet() {
  const { privateMatchStore, saveFollowOrder, saveOrder } = useMatch();
  const { showComfirmDialog } = useNotify();
  const model = reactive({
    showEvent: false,
    betModel: false,
    tempBetList: [] as any[],
    betList: [] as any[],
    multiple: 50,
  });

  const betCount = computed(() => model.betList.length);
  const betNames = computed(() =>
    model.betList.map(
      (item) => item.matchId + '_' + item.code + '_' + item.name
    )
  );
  const isSingle = computed(() => Object.keys(betStore.betInfo).length === 1);
  const getBetOrder = computed(() => {
    const betOder = [];
    const betInfo = betStore.betInfo;
    const betInfoKeys = Object.keys(betInfo);

    for (let i = 0; i < betInfoKeys.length; i++) {
      const betMatchItem = betInfo[betInfoKeys[i]];

      for (let j = 0; j < betMatchItem.orderOdds.length; j++) {
        const preOddsItem = betMatchItem.orderOdds[j];

        const defaultMatchInfo = {
          matchId: betMatchItem.matchId,
          // shortComp: betMatchItem.shortComp,
          // shortHome: betMatchItem.shortHome,
          // shortAway: betMatchItem.shortAway,
        };

        if (betInfoKeys.length === 1) {
          betOder.push({
            multiple: model.multiple,
            orderOdds: [
              {
                ...defaultMatchInfo,
                odds: preOddsItem.odds,
                oddRate: preOddsItem.oddRate,
              },
            ],
          });
        } else {
          for (let k = i + 1; !!betInfoKeys[k]; k++) {
            const matchInfo = {
              matchId: betInfo[betInfoKeys[k]].matchId,
              // shortComp: betInfo[betInfoKeys[k]].shortComp,
              // shortHome: betInfo[betInfoKeys[k]].shortHome,
              // shortAway: betInfo[betInfoKeys[k]].shortAway,
            };

            for (
              let kk = 0;
              kk < betInfo[betInfoKeys[k]].orderOdds.length;
              kk++
            ) {
              const oddsItem = betInfo[betInfoKeys[k]].orderOdds[kk];

              betOder.push({
                multiple: model.multiple,
                orderOdds: [
                  {
                    ...matchInfo,
                    odds: oddsItem.odds,
                    oddRate: oddsItem.oddRate,
                  },
                  {
                    ...defaultMatchInfo,
                    odds: preOddsItem.odds,
                    oddRate: preOddsItem.oddRate,
                  },
                ],
              });
            }
          }
        }
      }
    }

    console.log(betOder);

    return betOder;
  });

  const isSpfSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_spf_${txt}`);
  const isRqSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_rq_${txt}`);
  const isJqSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_jq_${txt}`);
  const isBqcSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_bqc_${txt}`);
  const isSfSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_sf_${txt}`);
  const isRfSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_rf_${txt}`);
  const isDxfSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_dxf_${txt}`);
  const isSfcSelect = (matchId: number, txt: string) =>
    betNames.value.includes(`${matchId}_sfc_${txt}`);

  const addBet = (data: any) => {
    const matchInfo = betStore.betInfo[data.matchId];
    if (matchInfo) {
      matchInfo.orderOdds.push({
        odds: data.odds,
        oddRate: data.oddRate,
        oddValue: data.oddValue,
        betName: data.betName,
      });
    } else {
      betStore.betInfo[data.matchId] = {
        matchId: data.matchId,
        shortComp: data.shortComp,
        shortHome: data.shortHome,
        shortAway: data.shortAway,
        matchTime: data.matchTime,
        org: { ...data.org },
      };
      betStore.betInfo[data.matchId].orderOdds = [
        {
          odds: data.odds,
          oddRate: data.oddRate,
          betName: data.betName,
          oddValue: data.oddValue,
        },
      ];
    }
  };

  const delBet = (data: any) => {
    if (data && data.delAll) {
      delete betStore.betInfo[data.matchId];
      return;
    }

    if (data && betStore.betInfo[data.matchId]) {
      betStore.betInfo[data.matchId].orderOdds = betStore.betInfo[
        data.matchId
      ].orderOdds.filter((item: any) => item.oddRate !== data.oddRate);

      if (!betStore.betInfo[data.matchId].orderOdds.length) {
        delete betStore.betInfo[data.matchId];
      }
    } else {
      betStore.betInfo = {};
      model.betList = [];
    }
  };

  const getBetMatchCount = () => Object.keys(betStore.betInfo).length;

  const getBetValue = (data: string, index: number) => {
    if (index !== undefined) {
      return data.split(',')[index];
    }
    return data.split(',');
  };

  const explandAll = () => {
    model.betModel = true;
  };
  const confirm = (data: any) => {
    model.tempBetList.forEach((item) => {
      addBet({
        matchId: data.id,
        shortComp: data.shortComp,
        shortHome: data.shortHome,
        shortAway: data.shortAway,
        matchTime: data.matchTime,
        playCode: item.playCode,
        betName: item.name,
        oddRate: `${item.playCode},${item.value}`,
        odds: item.code,
        oddValue: item.value,
        org: { ...data },
      });
    });

    model.betList = [...model.tempBetList];
    model.tempBetList = [];
    model.betModel = false;

    console.log('confirm1', betStore.betInfo);
    console.log('confirm2', model.betList);
  };
  const betEvent = (data: any) => {
    model.tempBetList = [...data];
  };
  const selectBet = (data: any, value: any, code: string, playCode: string) => {
    const betMap = betNameMap[code];
    const name =
      betMap.betName[betMap.betCode.findIndex((v: string) => v === playCode)];

    if (betNames.value.includes(`${data.id}_${code}_${name}`)) {
      model.betList.splice(
        model.betList.findIndex(
          (item) =>
            item.matchId === data.id &&
            item.playCode === playCode &&
            item.value === value &&
            item.code === code
        ),
        1
      );
      delBet({
        matchId: data.id,
        oddRate: `${playCode},${value}`,
      });
    } else {
      model.betList.push({
        matchId: data.id,
        name,
        playCode,
        value,
        code,
      });

      addBet({
        matchId: data.id,
        shortComp: data.shortComp,
        shortHome: data.shortHome,
        shortAway: data.shortAway,
        matchTime: data.matchTime,
        playCode,
        betName: name,
        oddRate: `${playCode},${value}`,
        odds: code,
        oddValue: value,
        org: { ...data },
      });
    }

    console.log('selectBet1', betStore.betInfo);
    console.log('selectBet2', model.betList);
  };

  // 获取投注总注单数
  const getBetCount = () => {
    return getBetOrder.value.length;
  };

  // 获取投注总金额
  const getBetTotalAmount = () => {
    return Utils.mathTimes(
      Utils.mathTimes(model.multiple, defaultBetAmount),
      getBetCount()
    );
  };

  // 计算预计奖金
  const getEstimatedBonus = () => {
    const betValue: any[] = [];
    Object.keys(betStore.betInfo).forEach((item) => {
      if (item) {
        betValue.push(
          ...[
            ...betStore.betInfo[item].orderOdds.map((item: any) =>
              Number(item.oddValue)
            ),
          ]
        );
      }
    });

    if (betValue.length) {
      const max = Math.max(...betValue);
      const min = Math.min(...betValue);
      const betAmount = getBetTotalAmount();

      return `${Utils.mathTimes(min, betAmount)}~${Utils.mathTimes(
        max,
        betAmount
      )}`;
    }

    return '0~0';
  };

  const addOrder = (betType: BET_TYPE) => {
    try {
      const params = {
        tmoney: getBetTotalAmount(),
        betType,
        codes: getBetOrder.value,
      };

      showComfirmDialog({
        title: '提示',
        content: `<div>
          <p>方案金额<span style="color:#FF7733;font-weight:500"> ${params.tmoney}</span></p>
          <p>您确定要提交方案吗？</p>
        </div>`,
        async confirm() {
          await saveOrder(params);
        },
      });
    } catch (e) {}
  };

  const flolowOrder = (betType: BET_TYPE) => {
    try {
      const params = {
        tmoney: getBetTotalAmount(),
        betType,
        codes: getBetOrder.value,
      };

      showComfirmDialog({
        title: '提示',
        content: `<div>
          <p>方案金额<span style="color:#FF7733;font-weight:500"> ${params.tmoney}</span></p>
          <p>您确定要进入发单设置吗？</p>
        </div>`,
        async confirm() {
          await saveFollowOrder(params);
        },
      });
    } catch (e) {}
  };

  onMounted(() => {
    window.xaCustomEvent.on(XA_DEL_BET, (data: any) => {
      delBet(data ? data : null);
    });
  });

  return {
    betStore,
    model,
    betCount,
    betNames,
    isSingle,
    addBet,
    delBet,
    getBetValue,
    explandAll,
    confirm,
    betEvent,
    selectBet,
    getBetMatchCount,
    isSpfSelect,
    isBqcSelect,
    isJqSelect,
    isRqSelect,
    isSfSelect,
    isRfSelect,
    isDxfSelect,
    isSfcSelect,
    getBetCount,
    getBetTotalAmount,
    getEstimatedBonus,
    addOrder,
    flolowOrder,
  };
}
