import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import http from "./http"
import iview from 'iview'
import nullData from "@/components/NullData"
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import { downloadChart } from "@/vender/html2"

Vue.use(iview)
import './permission'
Vue.config.productionTip = false
Vue.component("null-data",nullData)
import {
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Radio,
  RadioGroup,
  Option,
  Tree,
  Input,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Popover,
  Form,
  Switch,
  FormItem,
  Icon,
  Message
} from 'element-ui';
Vue.use(Pagination)
.use(Dialog)
.use(Menu)
.use(Submenu)
.use(MenuItem)
.use(MenuItemGroup)
.use(Checkbox)
.use(CheckboxButton)
.use(CheckboxGroup)
.use(Select)
.use(Option)
.use(OptionGroup)
.use(Button)
.use(ButtonGroup)
.use(Table)
.use(TableColumn)
.use(Popover)
.use(Form)
.use(FormItem)
.use(Icon)
.use(Input)
.use(Radio)
.use(RadioGroup)
.use(RadioButton)
.use(Tree)
.use(Switch)

Vue.prototype.$message = Message;



Vue.prototype.$http = http;
Vue.prototype.$G2 = G2;
Vue.prototype.$DataSet = DataSet;
Vue.prototype.$downloadChart = downloadChart;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})