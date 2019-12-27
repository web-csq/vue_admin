import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import http from "./http"
import iview from 'iview'

import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css'

Vue.use(iview)
import './permission'
Vue.config.productionTip = false

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
  Input,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Popover,
  Form,
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

Vue.prototype.$message = Message;



Vue.prototype.$http = http;
Vue.prototype.$G2 = G2;
Vue.prototype.$DataSet = DataSet;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})