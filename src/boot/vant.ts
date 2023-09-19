import { boot } from 'quasar/wrappers';
import { Swipe, SwipeItem, Button, Tab, Tabs, List, Dialog } from 'vant';
import 'vant/lib/index.css';

export default boot(({ app }) => {
  app.use(Swipe);
  app.use(SwipeItem);
  app.use(Button);
  app.use(Tab);
  app.use(Tabs);
  app.use(List);
  app.use(Dialog);
});
