(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8387c976"],{"1eef":function(t,e,a){"use strict";a.d(e,"d",(function(){return r})),a.d(e,"a",(function(){return c})),a.d(e,"b",(function(){return i})),a.d(e,"f",(function(){return s})),a.d(e,"c",(function(){return o}));var n=a("b775");function r(){return Object(n["a"])({url:"/company/department",method:"get"})}function c(t){return Object(n["a"])({url:"/company/department",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/company/department/".concat(t.id),method:"delete",data:t})}function s(t){return Object(n["a"])({url:"/company/department/".concat(t),method:"get"})}function o(t){return Object(n["a"])({url:"/company/department/".concat(t.id),method:"put",data:t})}},"9c17":function(t,e,a){"use strict";a("c6fd")},c6fd:function(t,e,a){},eb7c:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"historicalArcBox"},[a("div",{staticClass:"historicalArcTop"},[a("div",{staticClass:"title"},[a("span",[t._v("员工历史归档")]),a("div",{staticClass:"yearChange"},[a("el-date-picker",{attrs:{type:"year",format:"yyyy","value-format":"yyyy",width:"130px",placeholder:"选择年"},on:{change:t.handleChangeYear},model:{value:t.yearVal,callback:function(e){t.yearVal=e},expression:"yearVal"}})],1)])]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"historicalTable"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.showArchivig,expression:"showArchivig"}],staticClass:"archivig"},[t._v("该年份无归档报表")]),t._l(t.tableData,(function(e,n){return a("div",{key:n,staticClass:"itemes"},[a("div",{staticClass:"itemTopLab",class:{act:e.act}},[a("div",{staticClass:"lab",on:{click:function(a){return t.openTable(e,n)}}},[t._v(" > ")]),a("div",[a("p",{ref:"sheelName",refInFor:!0,staticClass:"title"},[t._v(t._s(e.archiveYear)+"-"+t._s(e.archiveMonth)+"月员工报表")]),a("p",{staticClass:"labTit",on:{click:function(a){return t.openTable(e,n)}}},[t._v("考勤统计")])]),a("div",{staticClass:"fr"},[a("div",[t._m(0,!0),a("p",{staticClass:"itemNum"},[t._v(t._s(e.totalPeopleNum))])]),a("div",[t._m(1,!0),a("p",{staticClass:"itemNum"},[t._v(t._s(e.fullAttePeopleNum))])])])]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.act,expression:"itemes.act"}],staticClass:"itemDropDown"},[a("el-alert",{attrs:{title:"迟到、早退和补签的统计单位为“次”；所有假期类型、外出、旷工的统计单位均为“天”。",type:"warning",closable:!1,"show-icon":""}}),a("div",{staticClass:"topLab"},[a("div",{staticClass:"rightLabBox"},[a("a",{staticClass:"el-button fr el-button--primary el-button--mini",attrs:{title:"导出"},on:{click:function(e){return t.handleExport(n)}}},[t._v("导出")])])]),a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{id:"item",data:t.contentData,height:"300",border:""}},[a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"}}),a("el-table-column",{attrs:{prop:"workNumber",label:"工号",width:"100"}}),a("el-table-column",{attrs:{prop:"mobile",label:"手机号",width:"200"}}),a("el-table-column",{attrs:{prop:"department",label:"部门",width:"200"}}),a("el-table-column",{attrs:{prop:"leaveDays",label:"事假",width:"100"}}),a("el-table-column",{attrs:{prop:"dayOffLeaveDays",label:"调休",width:"100"}}),a("el-table-column",{attrs:{prop:"normalDays",label:"正常",width:"100"}}),a("el-table-column",{attrs:{prop:"laterTimes",label:"迟到次数",width:"100"}}),a("el-table-column",{attrs:{prop:"earlyTimes",label:"早退次数",width:"100"}}),a("el-table-column",{attrs:{prop:"absenceDays",label:"旷工天数",width:"100"}}),a("el-table-column",{attrs:{prop:"isFullAttendanceint",formatter:t.fStandards,label:"是否全勤",width:"100"}}),a("el-table-column",{attrs:{prop:"actualAtteOfficialDays",label:"实际出勤天数（正式）",width:"180"}}),a("el-table-column",{attrs:{prop:"workingDays",label:"应出勤工作日",width:"120"}}),a("el-table-column",{attrs:{prop:"salaryOfficialDays",label:"计薪天数（正式）",width:"150"}})],1)],1)])}))],2)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"itemTit"},[a("span",[t._v("总人数")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"itemTit"},[a("span",[t._v("全勤人数")])])}],c=a("c7eb"),i=a("1da1"),s=(a("4de4"),a("d3b7"),a("b64b"),a("1eef")),o=a("f1e3"),u={name:"HistoricalArchiving",components:{},data:function(){return{num:0,yearVal:"",tableData:[],showArchivig:!1,counts:"",requestParameters:{departmentId:"",year:""},baseData:{atteArchiveMonthlyId:""},loading:!1,showHeight:40,boxHeight:"",departmentData:[],contentData:[]}},computed:{tables:function(){for(var t=this.baseData.keyword,e=0;e<this.tableData.length;e++){if(!t)return this.tableData[e].contentData;this.tableData[e].contentData.filter((function(e){return Object.keys(e).some((function(a){return String(e[a]).toLowerCase().indexOf(t)>-1}))}))}return null}},created:function(){var t=this.getMonth(),e=t.preDates,a=t.preYear;this.yearVal=e,this.requestParameters.year=a,this.getDepartments()},methods:{getMonth:function(){var t=new Date,e=t.getFullYear(),a=t.getMonth();0===a&&(a=12,e-=1),a<10&&(a="0"+a);var n=e,r=e+"-"+a,c=a;return a++,{preDates:r,preYear:n,preMonth:c}},fStandards:function(t){return 0===t?"是":"否"},getArchivingList:function(t){var e=this;return Object(i["a"])(Object(c["a"])().mark((function a(){return Object(c["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(o["f"])(t);case 2:e.tableData=a.sent,0===e.tableData.length?e.showArchivig=!0:e.showArchivig=!1,e.loading=!1;case 5:case"end":return a.stop()}}),a)})))()},getDepartments:function(){var t=this;return Object(i["a"])(Object(c["a"])().mark((function e(){var a,n;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["getDepartments"])();case 2:a=e.sent,n=a.depts,t.departmentData=n,t.requestParameters.departmentId=n[0].id,t.getArchivingList(t.requestParameters);case 7:case"end":return e.stop()}}),e)})))()},openTable:function(t,e){var a=this;return Object(i["a"])(Object(c["a"])().mark((function n(){return Object(c["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a.baseData.atteArchiveMonthlyId=t.id,t.act){n.next=9;break}return n.next=4,Object(o["e"])(a.baseData);case 4:a.contentData=n.sent,a.loading=!1,a.$set(a.tableData[e],"act",!0),n.next=10;break;case 9:a.$set(a.tableData[e],"act",!1);case 10:case"end":return n.stop()}}),n)})))()},handleExport:function(t){},handleChange:function(t){this.requestParameters.departmentId=t,this.init(this.requestParameters)},handleChangeYear:function(){this.requestParameters.year=this.yearVal,this.getArchivingList(this.requestParameters),0===this.tableData.length?this.showArchivig=!0:this.showArchivig=!1}}},l=u,d=(a("9c17"),a("2877")),h=Object(d["a"])(l,n,r,!1,null,"ad711b0a",null);e["default"]=h.exports},f1e3:function(t,e,a){"use strict";a.d(e,"i",(function(){return r})),a.d(e,"g",(function(){return c})),a.d(e,"q",(function(){return i})),a.d(e,"f",(function(){return s})),a.d(e,"e",(function(){return o})),a.d(e,"a",(function(){return u})),a.d(e,"n",(function(){return l})),a.d(e,"p",(function(){return d})),a.d(e,"m",(function(){return h})),a.d(e,"k",(function(){return p})),a.d(e,"c",(function(){return f})),a.d(e,"j",(function(){return b})),a.d(e,"o",(function(){return m})),a.d(e,"l",(function(){return v})),a.d(e,"b",(function(){return g})),a.d(e,"h",(function(){return w})),a.d(e,"d",(function(){return y}));a("99af");var n=a("b775");function r(t){return Object(n["a"])({url:"/attendances",params:t})}function c(t){return Object(n["a"])({url:"/attendances/archive/".concat(t.userId,"/").concat(t.yearMonth)})}function i(t){return Object(n["a"])({url:"/attendances/".concat(t.userId),method:"put",data:t})}function s(t){return Object(n["a"])({url:"/attendances/reports/year",params:t})}function o(t){return Object(n["a"])({url:"/attendances/reports/".concat(t.atteArchiveMonthlyId),params:t})}function u(t){return Object(n["a"])({url:"/attendances/archives",params:t})}function l(t){return Object(n["a"])({url:"/attendances/newReports",params:t})}function d(t){return Object(n["a"])({url:"/attendances/reports",params:t})}function h(t){return Object(n["a"])({url:"/cfg/leave",method:"put",data:t})}function p(t){return Object(n["a"])({url:"/cfg/leave/list",method:"post",data:t})}function f(t){return Object(n["a"])({url:"/cfg/deduction",method:"put",data:t})}function b(t){return Object(n["a"])({url:"/cfg/ded/list",method:"post",data:t})}function m(t){return Object(n["a"])({url:"/cfg/extDuty",method:"put",data:t})}function v(t){return Object(n["a"])({url:"/cfg/extDuty/item",method:"post",data:t})}function g(t){return Object(n["a"])({url:"/cfg/atte",method:"put",data:t})}function w(t){return Object(n["a"])({url:"/cfg/atte/item",method:"post",data:t})}function y(t){return Object(n["a"])({url:"/employees/archives/".concat(t.month),method:"put",data:t})}}}]);