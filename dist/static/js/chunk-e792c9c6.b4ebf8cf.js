(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e792c9c6"],{"0686":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"salaryApproval"},[s("div",{staticClass:"contLeft"},[s("div",{staticClass:"topTit"},[s("img",{attrs:{src:e("616f"),alt:""}}),s("div",{staticClass:"info"},[s("p",{staticClass:"name"},[s("strong",[t._v(" "+t._s(t.information.user.fullName)+" ")])]),s("p",[t._v(t._s(t.information.user.department)+" | "+t._s(t.information.user.post))]),s("p",[t._v(t._s(t.information.user.inJobTime))])])]),s("div",{staticClass:"content"},t._l(t.information.body,(function(n,e){return s("p",{key:e},[s("span",[t._v(t._s(n.key)+" ")]),t._v(" "+t._s(n.val))])})),0)]),s("div",{staticClass:"contRit"},[t._m(0),s("div",{staticClass:"Items"},t._l(t.reviewHistoryDataes,(function(n,e){return s("li",{key:e},[s("div",{staticClass:"name"},[s("p",[t._v(t._s(n.opTime))]),s("p",[t._v(t._s(n.description))])]),s("div",{staticClass:"act"},[s("strong",[t._v(t._s(n.opUserName))]),1==n.state?s("span",[t._v("审批中")]):2==n.state?s("span",[t._v("审批驳回")]):3==n.state?s("span",[t._v("已撤销")]):4==n.state?s("span",[t._v("审批通过")]):t._e()])])})),0)])])},r=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"topTit"},[e("strong",[t._v("审批记录")])])}],a=e("c7eb"),c=e("1da1"),i=e("2506"),o={name:"UsersTableIndex",components:{},data:function(){return{information:{},reviewHistoryDataes:{}}},created:function(){this.getInformation(),this.getReviewHistory()},methods:{getInformation:function(){var t=this;return Object(c["a"])(Object(a["a"])().mark((function n(){return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(i["f"])({id:1});case 2:t.information=n.sent;case 3:case"end":return n.stop()}}),n)})))()},getReviewHistory:function(t){var n=this;return Object(c["a"])(Object(a["a"])().mark((function t(){var e,s;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["g"])({id:1});case 2:e=t.sent,s=e.data,n.reviewHistoryDataes=s;case 5:case"end":return t.stop()}}),t)})))()}}},u=o,f=(e("0bb7"),e("2877")),p=Object(f["a"])(u,s,r,!1,null,"0e05c054",null);n["default"]=p.exports},"0bb7":function(t,n,e){"use strict";e("21a7")},"21a7":function(t,n,e){},2506:function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"f",(function(){return a})),e.d(n,"g",(function(){return c})),e.d(n,"h",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"d",(function(){return u})),e.d(n,"a",(function(){return f})),e.d(n,"e",(function(){return p})),e.d(n,"i",(function(){return d}));e("99af");var s=e("b775");function r(t){return Object(s["a"])({url:"/user/process/instance/".concat(t.page,"/").concat(t.pageSize),method:"put",data:t})}function a(t){return Object(s["a"])({url:"/user/process/instance/getById/".concat(t)})}function c(t){return Object(s["a"])({url:"/approvals/flows/".concat(t)})}function i(t){return Object(s["a"])({url:"/approvals/setting",method:"put",data:t})}function o(t){return Object(s["a"])({url:"/user/process/instance/".concat(t)})}function u(t){return Object(s["a"])({url:"/user/process/instance/tasks/".concat(t)})}function f(t){return Object(s["a"])({url:"//user/process/buss/showBussImgById/".concat(t)})}function p(t){return Object(s["a"])({url:"/user/process/definition",params:t})}function d(t){return Object(s["a"])({url:"/user/process/suspend/".concat(t.processKey),params:t})}},"616f":function(t,n,e){t.exports=e.p+"static/img/img.0615818f.jpeg"}}]);