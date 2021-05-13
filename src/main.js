/*
 * @Author: your name
 * @Date: 2020-10-17 19:17:45
 * @LastEditTime: 2020-12-13 15:05:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Tabbar, TabbarItem } from 'vant';
import { AddressEdit } from 'vant';
import { Skeleton } from 'vant';
import { Field } from 'vant';
import { Tag } from 'vant';
import { Button } from 'vant';
import { Icon } from 'vant';
import { Search } from 'vant';
import { Col, Row } from 'vant';
import { Cell, CellGroup } from 'vant';
import { NavBar } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Form } from 'vant';
import { Dialog } from 'vant';
import { Toast } from 'vant';
import { Loading } from 'vant';
import { NoticeBar } from 'vant';

Vue.use(NoticeBar);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(NavBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(Search)
Vue.use(Icon);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Field);
Vue.use(Skeleton);
Vue.config.productionTip = false
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(AddressEdit);
Vue.use(Toast);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
