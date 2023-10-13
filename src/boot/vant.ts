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
  SkeletonImage,
  PullRefresh,
  Image,
  ActionSheet,
  Collapse,
  CollapseItem,
  Popup,
  Stepper,
  Field,
  RadioGroup,
  Radio,
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
  app.use(SkeletonImage);
  app.use(PullRefresh);
  app.use(Image);
  app.use(ActionSheet);
  app.use(Collapse);
  app.use(CollapseItem);
  app.use(Popup);
  app.use(Stepper);
  app.use(Field);
  app.use(RadioGroup);
  app.use(Radio);

  app.component('Headers', Header);
  app.component('PageList', PageList);
});
