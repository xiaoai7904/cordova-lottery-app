import { boot } from 'quasar/wrappers';
import {
  Swipe,
  SwipeItem,
  Button,
  Tab,
  Tabs,
  List,
  Dialog,
  Icon,
  Cell,
  CellGroup,
  Uploader,
} from 'vant';
import 'vant/lib/index.css';
import Header from '../../src/components/Header/Header.vue';
export default boot(({ app }) => {
  app.use(Swipe);
  app.use(SwipeItem);
  app.use(Button);
  app.use(Tab);
  app.use(Tabs);
  app.use(List);
  app.use(Dialog);
  app.use(Icon);
  app.use(Cell);
  app.use(CellGroup);
  app.use(Uploader);

  app.component('Headers', Header);
});
