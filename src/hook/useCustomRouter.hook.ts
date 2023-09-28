import { RouterNameEnum } from 'src/common';
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

export function gotoByPath(path: string) {
  const router = useCustomRouter();
  router.push(path);
}

export function gotoByName(name: RouterNameEnum) {
  const router = useCustomRouter();
  router.push({ name });
}
