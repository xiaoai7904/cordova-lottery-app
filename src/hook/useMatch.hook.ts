import {
  BasketballRequest,
  FootballRequest,
  MatchFootballCompRequest,
  MatchBasketballCompRequest,
} from 'src/common';
import { reactive } from 'vue';

export function useMatch() {
  const privateMatchStore = reactive({
    loading: false,
    basketball: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
      matchList: [] as any[],
    },
    football: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
      matchList: [] as any[],
    },
  });

  const getBaketBallScoreList = async (params = {}) => {
    try {
      privateMatchStore.loading = true;
      const data = await BasketballRequest<any, any>(
        Object.assign(
          {
            pageNum: privateMatchStore.basketball.pageNum,
            ...params,
          },
          privateMatchStore.basketball.beginTime
            ? {
                beginTime: privateMatchStore.basketball.beginTime,
                endTime: privateMatchStore.basketball.endTime,
              }
            : {}
        )
      );

      if (privateMatchStore.basketball.pageNum === 1) {
        privateMatchStore.basketball.list = [...data.records];
      } else {
        privateMatchStore.basketball.list = [
          ...privateMatchStore.basketball.list,
          ...data.records,
        ];
      }

      privateMatchStore.basketball.total = data.total;
      privateMatchStore.basketball.isLoadEnd =
        privateMatchStore.basketball.list.length >= data.total;
      privateMatchStore.basketball.pageSize = data.pageSize;
      privateMatchStore.basketball.pages = data.pages;
    } finally {
      privateMatchStore.loading = false;
    }
  };

  const getFootballScoreList = async (params = {}) => {
    try {
      privateMatchStore.loading = true;
      const data = await FootballRequest<any, any>(
        Object.assign(
          {
            pageNum: privateMatchStore.football.pageNum,
            ...params,
          },
          privateMatchStore.football.beginTime
            ? {
                beginTime: privateMatchStore.football.beginTime,
                endTime: privateMatchStore.football.endTime,
              }
            : {}
        )
      );

      if (privateMatchStore.football.pageNum === 1) {
        privateMatchStore.football.list = [...data.records];
      } else {
        privateMatchStore.football.list = [
          ...privateMatchStore.football.list,
          ...data.records,
        ];
      }

      privateMatchStore.football.total = data.total;
      privateMatchStore.football.isLoadEnd =
        privateMatchStore.football.list.length >= data.total;
      privateMatchStore.football.pageSize = data.pageSize;
      privateMatchStore.football.pages = data.pages;
    } finally {
      privateMatchStore.loading = false;
    }
  };

  const getBaketBallMatchList = async (params = {}) => {
    try {
      privateMatchStore.loading = true;
      const data = await MatchBasketballCompRequest<any, any>(params);
      privateMatchStore.basketball.matchList = [...data];
    } finally {
      privateMatchStore.loading = false;
    }
  };

  const getFootBallMatchList = async (params = {}) => {
    try {
      privateMatchStore.loading = true;
      const data = await MatchFootballCompRequest<any, any>(params);
      privateMatchStore.football.matchList = [...data];
    } finally {
      privateMatchStore.loading = false;
    }
  };

  return {
    privateMatchStore,
    getBaketBallScoreList,
    getFootballScoreList,
    getBaketBallMatchList,
    getFootBallMatchList,
  };
}
