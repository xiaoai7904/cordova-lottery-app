import { reactive, computed, onMounted } from 'vue';
import { betNameMap, XA_DEL_BET } from 'src/common';
const betStore = reactive({
  betInfo: {} as any,
});

export function useBet() {
  const model = reactive({
    showEvent: false,
    betModel: false,
    tempBetList: [] as any[],
    betList: [] as any[],
  });

  const betCount = computed(() => model.betList.length);
  const betNames = computed(() =>
    model.betList.map((item) => item.code + '_' + item.name)
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
      });
    } else {
      betStore.betInfo[data.matchId] = {
        matchId: data.matchId,
        shortComp: data.shortComp,
        shortHome: data.shortHome,
        shortAway: data.shortAway,
      };
      betStore.betInfo[data.matchId].orderOdds = [
        {
          odds: data.odds,
          oddRate: data.oddRate,
        },
      ];
    }
  };

  const delBet = (data: any) => {
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

    console.log('delBet1', betStore.betInfo);
    console.log('delBet2', model.betList);
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
        oddRate: `${item.playCode},${item.value}`,
        odds: item.code,
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
        oddRate: `${playCode},${value}`,
        odds: code,
      });
    }

    console.log('selectBet1', betStore.betInfo);
    console.log('selectBet2', model.betList);
    console.log(betNames.value);
  };

  onMounted(() => {
    window.xaCustomEvent.on(XA_DEL_BET, () => {
      delBet(null);
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
  };
}
