import { boot } from 'quasar/wrappers';
import { Swipe, SwipeItem, Button } from 'vant';
import 'vant/lib/index.css';

export default boot(({ app }) => {
  app.use(Swipe);
  app.use(SwipeItem);
  app.use(Button);
});
