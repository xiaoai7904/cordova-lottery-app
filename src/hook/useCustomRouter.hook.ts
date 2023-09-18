import { ref } from 'vue';
import { useRouter } from 'vue-router';

let proxyRouter: any = null;
const needAnimate = ref(false);

export function useRouterAnimate() {
  return needAnimate;
}
export function useCustomRouter() {
  if (proxyRouter) {
    return proxyRouter;
  }
  const router = useRouter();
  proxyRouter = new Proxy(router, {
    get(target, props: any, receiver) {
      if (['push', 'back'].includes(props)) {
        needAnimate.value = true;
      } else {
        needAnimate.value = false;
      }
      return Reflect.get(target, props, receiver);
    },
  });
  return proxyRouter;
}
