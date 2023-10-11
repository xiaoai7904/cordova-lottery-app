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
    model.betList.map((item) => item.code + '_' + item.name)
  );
  const betAmount = computed(() =>
    Utils.mathTimes(model.multiple, defaultBetAmount)
  );

  const isSpfSelect = (txt: string) => betNames.value.includes(`spf_${txt}`);
  const isRqSelect = (txt: string) => betNames.value.includes(`rq_${txt}`);
  const isJqSelect = (txt: string) => betNames.value.includes(`jq_${txt}`);
  const isBqcSelect = (txt: string) => betNames.value.includes(`bqc_${txt}`);

  const addBet = (data: any) => {
    const matchInfo = betStore.betInfo[data.matchId];
    if (matchInfo) {
      matchInfo.orderOdds.push({
        odds: data.odds,
        oddRate: data.oddRate,
        oddValue: data.oddValue,
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
      ].orderOdds.filter((item: any) => item.odds !== data.odds);

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
    if (betNames.value.includes(`${code}_${name}`)) {
      model.betList = model.betList.filter((item) => item.name !== name);
      delBet({
        matchId: data.id,
        odds: code,
      });
    } else {
      model.betList.push({
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
  const getBetCount = (isSingle: boolean) => {
    let betCount = 0;
    Object.keys(betStore.betInfo).forEach((item) => {
      betCount += betStore.betInfo[item].orderOdds.length;
    });

    if (isSingle) {
      return combination(betCount, 2);
    }
    return betCount;
  };

  // 获取投注总金额
  const getBetTotalAmount = (isSingle: boolean) => {
    return Utils.mathTimes(
      Utils.mathTimes(model.multiple, defaultBetAmount),
      getBetCount(isSingle)
    );
  };

  // 计算预计奖金
  const getEstimatedBonus = (isSingle: boolean) => {
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
      const betAmount = getBetTotalAmount(isSingle);

      return `${Utils.mathTimes(min, betAmount)}~${Utils.mathTimes(
        max,
        betAmount
      )}`;
    }

    return '0~0';
  };

  const factorial = (n: number): number => {
    // 阶乘函数
    if (n === 0) {
      return 1;
    } else {
      return Utils.mathTimes(n, factorial(n - 1));
    }
  };

  // 计算排列组合
  const combination = (n: number, k: number) => {
    // 组合数函数
    return Math.ceil(
      Utils.mathDiv(
        factorial(n),
        Utils.mathTimes(factorial(k), factorial(n - k))
      )
    );
  };

  const addOrder = (isSingle: boolean, betType: BET_TYPE) => {
    try {
      const params = {
        tmoney: getBetTotalAmount(isSingle),
        betType,
        codes: [],
      };

      showComfirmDialog({
        title: '提示',
        content: `<div>
          <p>方案金额<span style="color:##FF7733">${params.tmoney}</span></p>
          <p>您确定要提交方案吗？</p>
        </div>`,
        async confirm() {
          console.log(11);
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
    getBetCount,
    getBetTotalAmount,
    getEstimatedBonus,
    addOrder,
  };
}
