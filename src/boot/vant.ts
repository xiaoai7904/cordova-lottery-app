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
  Skeleton,
  PullRefresh,
  Image,
  ActionSheet,
} from 'vant';
import 'vant/lib/index.css';
import Header from 'src/components/Header/Header.vue';
import PageList from 'src/components/PageList/PageList.vue';

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
  app.use(Skeleton);
  app.use(PullRefresh);
  app.use(Image);
  app.use(ActionSheet);

  app.component('Headers', Header);
  app.component('PageList', PageList);
});
