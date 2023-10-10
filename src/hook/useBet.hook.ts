import { reactive } from 'vue';

const betStore = reactive({
  betInfo: {} as any,
});

export function useBet() {
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
    if (betStore.betInfo[data.matchId]) {
      betStore.betInfo[data.matchId].orderOdds = betStore.betInfo[
        data.matchId
      ].orderOdds.filter((item: any) => item.odds !== data.odds);

      if (!betStore.betInfo[data.matchId].orderOdds.length) {
        delete betStore.betInfo[data.matchId];
      }
    }
  };

  const getBetCount = () => {
    betStore.betInfo;
  };

  const getBetValue = (data: string, index: number) => {
    if (index !== undefined) {
      return data.split(',')[index];
    }
    return data.split(',');
  };

  return {
    betStore,
    addBet,
    delBet,
    getBetValue,
  };
}
