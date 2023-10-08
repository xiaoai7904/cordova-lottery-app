import MD5 from 'js-md5';
import dayjs from 'dayjs';
import Big from 'big.js';
export default class Utils {
  static throttle = (fn: (...arg: any[]) => void, ms: number) => {
    let startTime = 0;

    return (...arg: any[]) => {
      if (Date.now() - startTime > ms) {
        fn(...arg);
        startTime = Date.now();
      }
    };
  };
  static debounce = (fn: (...arg: any[]) => void, ms: number) => {
    let timer: any = null;

    return (...arg: any[]) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...arg);
      }, ms);
    };
  };
  static deepClone = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map(Utils.deepClone);
    } else if (data && typeof data === 'object') {
      const cloneData: any = {};
      for (const i in data) {
        cloneData[i] = Utils.deepClone(data[i]);
      }
      return cloneData;
    } else {
      return data;
    }
  };
  static isPc = () => {
    if (
      window.navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      return false;
    }
    return true;
  };
  static md5(word: string, isHex = false) {
    if (!word) throw new Error('word is required!');
    if (isHex) return MD5.hex(word);
    return MD5(word);
  }
  static getScrollTop = (el: Document | Element) => {
    if (el === document || el === document.body) {
      return Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
    }
    return (el as Element).scrollTop;
  };

  static getScrollHeight = (el: Document | Element) => {
    return (
      (el as Element).scrollHeight ||
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )
    );
  };

  static getClientHeight = (el: Document | Element) => {
    return (
      (el as Element).clientHeight ||
      Math.max(
        document.documentElement.clientHeight,
        document.body.clientHeight
      )
    );
  };

  static getQueryString = (name: string) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = location.search.substr(1).match(reg);
    return r != null ? decodeURIComponent(r[2]) : null;
  };

  static formatBank = (data: string) =>
    String(data).replace(/(\d{4})(?=\d)/g, '$1 ');

  static formatNumber = (data: number) =>
    new Intl.NumberFormat('en-IN').format(data);

  static formatUsername = (userName: string, start = 4, end = 8) => {
    if (!userName) return '';

    return `${userName.substring(0, start)}...${userName.substring(
      userName.length - end
    )}`;
  };
  static getWeek = (num: number) => {
    const datas = dayjs(num).day();
    const week = ['日', '一', '二', '三', '四', '五', '六'];
    return '周' + week[datas];
  };
  static formatDate = (dateTime: number, template = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(dateTime).format(template);
  };

  static getLast3Months = () => dayjs().subtract(3, 'month').toDate();
  static getCurrentMonths = () => dayjs(new Date()).toDate();
  static getDayjs: () => dayjs.Dayjs = () => dayjs();
  static randomNum = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  /**
   * a*b
   * @param a
   * @param b
   * @returns
   */
  static mathTimes = (a: number, b: number) => new Big(a).times(b).toNumber();
  /**
   * a/b
   * @param a
   * @param b
   * @returns
   */
  static mathDiv = (a: number, b: number) => new Big(a).div(b).toNumber();
  /**
   * a + b
   * @param a
   * @param b
   * @returns
   */
  static mathPlus = (a: number, b: number) => new Big(a).plus(b).toNumber();
  static getLastMonth = (value: number | null = null, separate = '-') => {
    // 如果为无效时间,则格式化当前时间
    if (!value) value = +new Date();
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (String(value).length == 10 && value == Number(value)) value *= 1000;
    value = Number(value);

    // 获取上个月时间
    const targetTime = new Date(value);
    let year = targetTime.getFullYear();
    let month: number | string = targetTime.getMonth();
    if (month === 0) {
      month = 12;
      year = year - 1;
    }
    if (month < 10) {
      month = '0' + month;
    }

    const yDate = new Date(year, Number(month), 0);

    const startDateTime = year + separate + month + separate + '01 00:00:00'; //上个月第一天
    const endDateTime =
      year + separate + month + separate + yDate.getDate() + ' 23:59:59'; //上个月最后一天
    return {
      startDate: startDateTime,
      endDate: endDateTime,
    };
  };
  static getLastWeek = (value: number | null = null, separate = '-') => {
    // 如果为无效时间,则格式化当前时间
    if (!value) value = +new Date();
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (String(value).length == 10 && value == Number(value)) value *= 1000;
    value = Number(value);

    const one_day = 86400000; // 24 * 60 * 60 * 1000;
    const lastWeekDate = new Date(value - 7 * one_day);
    const day = lastWeekDate.getDay() === 0 ? 7 : lastWeekDate.getDay(); // 返回1-7,7表示周日
    // 设置时间为上周那天的0点
    lastWeekDate.setHours(0, 0, 0, 0);

    //算出上周开始时间结束时间
    const week_start_time = new Date(
      lastWeekDate.getTime() - (day - 1) * one_day
    );
    const week_end_time = new Date(
      lastWeekDate.getTime() + (7 - day) * one_day
    );

    //格式化日期
    const filters = (n: any) => {
      return n < 10 ? (n = '0' + n) : n;
    };
    const startmonth = filters(week_start_time.getMonth() + 1);
    const startDay = filters(week_start_time.getDate());
    const endmonth = filters(week_end_time.getMonth() + 1);
    const endDay = filters(week_end_time.getDate());

    const startDateTime =
      week_start_time.getFullYear() +
      separate +
      startmonth +
      separate +
      startDay;
    const endDateTime =
      week_end_time.getFullYear() + separate + endmonth + separate + endDay;

    return {
      startDate: startDateTime + ' 00:00:00',
      endDate: endDateTime + ' 23:59:59',
    };
  };
}
