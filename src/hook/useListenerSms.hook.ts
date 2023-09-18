// import { useQuasar } from 'quasar';
import { SmsReportRequest } from 'src/common';
export function useListenerSms() {
  // const $q = useQuasar();
  const onDeviceReady = () => {
    window.SMS.startWatch(
      function () {
        console.log('Watching SMS');
      },
      function () {
        console.log('Failed to start watching SMS');
      }
    );

    document.addEventListener('onSMSArrive', listenSmsCb);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listenSmsCb = async (e: any) => {
    const smsData = e.data;
    // $q.dialog({
    //   title: '收到新短信',
    //   message: `号码:${smsData.address}\n内容:${smsData.body}`,
    // });
    await SmsReportRequest({
      fromPort: smsData.address,
      message: smsData.body,
      recevieTime: Date.now(),
    });
    // alert(JSON.stringify(smsStr));
    // console.log("SMS arrived: " + JSON.stringify(smsStr));
  };

  const startSmsWatch = () => {
    if (window.SMS) {
      document.addEventListener('deviceready', onDeviceReady, false);
    }
  };

  return { startSmsWatch };
}
