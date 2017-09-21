"use strict";angular.module("appManager",["ngAnimate","ngSanitize","ngTouch","ui.router","ui.bootstrap","btford.socket-io","ui.select","ui.bootstrap.datetimepicker","LocalStorageModule"]).config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("dashboard",{url:"/dashboard",templateUrl:"views/states/dashboard.html",controller:"DashboardCtrl"}).state("chat",{url:"/chat",templateUrl:"views/states/chat.html",controller:"ChatCtrl"}).state("order",{url:"/order",templateUrl:"views/states/order.html",controller:"OrderCtrl"}).state("orderDetail",{url:"/order/:id",templateUrl:"views/states/order-detail.html",controller:"OrderDetailCtrl"}).state("report",{url:"/report",templateUrl:"views/states/report.html",controller:"ReportCtrl"}).state("reportAll",{url:"/reportAll",templateUrl:"views/states/report-all.html",controller:"ReportAllCtrl"}).state("reportDetail",{url:"/report/:id",templateUrl:"views/states/report-detail.html",controller:"ReportDetailCtrl"}).state("setting",{url:"/setting",templateUrl:"views/states/setting.html",controller:"SettingCtrl"}),b.otherwise("/dashboard")}]),angular.module("appManager").constant("config",{url:"http://54.255.179.165:8080",vicare:"http://vicare.vn",api:{question:"/api/questions/",calendar:"/api/calendars/",professional:"/api/v1/professional/",order:"/api/orders/",searchPro:"/api/professionals/",report:"/api/reports/",setting:"/api/settings/"}}),angular.module("appManager").controller("DashboardCtrl",["$scope","$http","config",function(a,b,c){a.data={},a.updateStatus=function(a){b.put(c.url+c.api.question+a._id,{active:a.active}).then(function(a){console.log(a)})};var d=function(){b.get(c.url+c.api.question).then(function(b){a.data.questions=b.data})};d()}]),angular.module("appManager").controller("ChatCtrl",["$scope","$http","config","$uibModal",function(a,b,c,d){a.data={},a.data.times=[{time:"00:00"},{time:"00:30"},{time:"01:00"},{time:"01:30"},{time:"02:00"},{time:"02:30"},{time:"03:00"},{time:"03:30"},{time:"04:00"},{time:"04:30"},{time:"05:00"},{time:"05:30"},{time:"06:00"},{time:"06:30"},{time:"07:00"},{time:"07:30"},{time:"08:00"},{time:"08:30"},{time:"09:00"},{time:"09:30"},{time:"10:00"},{time:"10:30"},{time:"11:00"},{time:"11:30"},{time:"12:00"},{time:"12:30"},{time:"13:00"},{time:"13:30"},{time:"14:00"},{time:"14:30"},{time:"15:00"},{time:"15:30"},{time:"16:00"},{time:"16:30"},{time:"17:00"},{time:"17:30"},{time:"18:00"},{time:"18:30"},{time:"19:00"},{time:"19:30"},{time:"20:00"},{time:"20:30"},{time:"21:00"},{time:"21:30"},{time:"22:00"},{time:"22:30"},{time:"23:00"},{time:"23:30"}],a.today=function(){a.dt=new Date},a.today(),a.clear=function(){a.today()},a.dateOptions={formatYear:"yyyy",maxDate:new Date(2020,5,22),startingDay:1},a.open1=function(){a.popup1.opened=!0},a.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],a.format=a.formats[1],a.altInputFormats=a.formats[1],a.popup1={opened:!1},a.addCalendar=function(b){console.log(b),b.date=a.dt;var c=d.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"./views/modals/time.html",controller:"ModalTimeCtrl",size:"md",resolve:{item:function(){return b}}});c.result.then(function(a){b.professional=a.professional},function(){})},a.$watch("dt",function(a){console.log(a),e()});var e=function(){var d=angular.copy(a.dt),e=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();b.get(c.url+c.api.calendar,{params:{date:e}}).then(function(b){console.log(b.data),angular.forEach(a.data.times,function(a){a.professional=null,a.id=null;for(var c=0;c<b.data.length;c++)a.time==b.data[c].time&&(a.professional=b.data[c].professional,a.id=b.data[c]._id,console.log(a))}),console.log(a.data.times)})};e()}]),angular.module("appManager").controller("ModalTimeCtrl",["$scope","item","$http","$uibModalInstance","config",function(a,b,c,d,e){function f(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}console.log(b),a.timeSelected=b,a.search={user:a.timeSelected.professional||[]},console.log(a.search),a.addPro=function(b){for(var c,d=0;d<a.search.user.length;d++)if(b.username==a.search.user[d].name){c=!0;break}c||a.search.user.push(b),a.search.name="",a.search.items=[]},a.removePro=function(b){a.search.user.splice(b,1)},a.added=function(){if(a.timeSelected.id)c.put(e.url+e.api.calendar+a.timeSelected.id,{professional:a.search.user}).then(function(a){d.close(a.data)});else if(a.timeSelected.date&&a.timeSelected.time&&a.search.user.length){var b=angular.copy(a.timeSelected.date),f=b.getFullYear()+"/"+(b.getMonth()+1)+"/"+b.getDate(),g={date:f,time:a.timeSelected.time,professional:a.search.user};c.post(e.url+e.api.calendar,g).then(function(a){d.close(a.data)})}},a.getUser=f(function(){console.log(a.search.name),c.get(e.url+e.api.searchPro,{params:{name:a.search.name}}).then(function(b){console.log(b.data),a.search.items=JSON.parse(b.data.body),a.search.name||(a.search.items=[])})},250)}]),angular.module("appManager").controller("OrderCtrl",["$scope","$http","config","$state",function(a,b,c,d){a.data={orders:[]},a.goToOrder=function(a){d.go("orderDetail",{id:a})};var e=function(){b.get(c.url+c.api.order).then(function(b){a.data.orders=b.data})};e()}]),angular.module("appManager").controller("OrderDetailCtrl",["$scope","$http","config","$stateParams",function(a,b,c,d){a.data={},a.refreshProfessional=function(d){b.get(c.vicare+c.api.professional,{params:{name:d}}).then(function(b){a.data.professionals=b.data,console.log(b.data)})},a.saveOrder=function(){var e={open:a.data.order.open,end:a.data.order.end,professional:a.data.order.professional,status:2};b.put(c.url+c.api.order+d.id,e).then(function(a){}),console.log(e)};var e=function(){b.get(c.url+c.api.order+d.id).then(function(b){a.data.order=b.data,console.log(a.data.order)})};e()}]),angular.module("appManager").controller("ReportCtrl",["$scope","$http","config","$state","localStorageService",function(a,b,c,d,e){a.data={reports:[]},a.goHistoryChat=function(a,b){d.go("reportDetail",{id:a}),e.set("reportDetail",b)};var f=function(){b.get(c.url+c.api.report).then(function(b){a.data.reports=b.data,console.log(b.data)})};f()}]),angular.module("appManager").controller("ReportDetailCtrl",["$scope","$http","config","$stateParams","localStorageService",function(a,b,c,d,e){a.data={};var f=function(){a.data.chanel=e.get("reportDetail"),b.get(c.url+c.api.report+d.id).then(function(b){a.data.messages=b.data,console.log(a.data.messages,a.data.chanel)})};f()}]),angular.module("appManager").controller("ReportAllCtrl",["$scope","$http","config","$state","localStorageService",function(a,b,c,d,e){a.data={reports:[],selectFilter:"1"},a.goHistoryChat=function(a,b){d.go("reportDetail",{id:a}),e.set("reportDetail",b)},a.selectDataFilter=function(d){b.post(c.url+c.api.report+"index-all",{filter:d}).then(function(b){a.data.reports=b.data})};var f=function(){b.post(c.url+c.api.report+"index-all/").then(function(b){a.data.reports=b.data})};f()}]),angular.module("appManager").controller("SettingCtrl",["$scope","$http","config","$state",function(a,b,c,d){a.data={setting:{}},a.changeOpenChat=function(){console.log(a.data.setting.openChat),b.put(c.url+c.api.setting,a.data.setting).then(function(a){console.log(a)})};var e=function(){b.get(c.url+c.api.setting).then(function(b){a.data.setting=b.data,console.log(b.data)})};e()}]),function(a,b){if("undefined"!=typeof module&&module.exports){var c="undefined"==typeof angular?require("angular"):angular,d="undefined"==typeof moment?require("moment"):moment;b(c,d),module.exports="ui.bootstrap.datetimepicker"}else"function"==typeof define&&define.amd?define(["angular","moment"],b):b(a.angular,a.moment)}(this,function(a,b){function c(c,d){function e(e,g,h){function i(a,b,c){if(c&&(c.stopPropagation(),c.preventDefault()),a&&b.utcDateValue>-(1/0)&&b.selectable&&x[a]){var d=x[a](b.utcDateValue),f=[];if(d.weeks)for(var g=0;g<d.weeks.length;g+=1)for(var h=d.weeks[g],i=0;i<h.dates.length;i+=1){var j=h.dates[i];f.push(j)}e.beforeRender({$view:d.currentView,$dates:d.dates||f,$leftDate:d.leftDate,$upDate:d.previousViewDate,$rightDate:d.rightDate}),e.data=d}}function j(a){for(var c=b.utc(a).startOf("year"),d=10*parseInt(c.year()/10,10),e=b.utc(q(a)).subtract(1,"year").startOf("year"),g="YYYY",h=r(v.$modelValue,g),i=b().format(g),j={currentView:"year",nextView:"year"===w.minView?"setTime":"month",previousViewDate:new f({utcDateValue:null,display:d+"-"+(d+9)}),leftDate:new f({utcDateValue:b.utc(e).subtract(9,"year").valueOf()}),rightDate:new f({utcDateValue:b.utc(e).add(11,"year").valueOf()}),dates:[]},k=0;12>k;k+=1){var l=b.utc(e).add(k,"years"),m={active:l.format(g)===h,current:l.format(g)===i,display:l.format(g),future:l.year()>d+9,past:l.year()<d,utcDateValue:l.valueOf()};j.dates.push(new f(m))}return j}function k(a){for(var c=b.utc(a).startOf("year"),d=q(a),e="YYYY-MMM",g=r(v.$modelValue,e),h=b().format(e),i={previousView:"year",currentView:"month",nextView:"month"===w.minView?"setTime":"day",previousViewDate:new f({utcDateValue:d.valueOf(),display:c.format("YYYY")}),leftDate:new f({utcDateValue:b.utc(c).subtract(1,"year").valueOf()}),rightDate:new f({utcDateValue:b.utc(c).add(1,"year").valueOf()}),dates:[]},j=0;12>j;j+=1){var k=b.utc(c).add(j,"months"),l={active:k.format(e)===g,current:k.format(e)===h,display:k.format("MMM"),utcDateValue:k.valueOf()};i.dates.push(new f(l))}return i}function l(a){for(var c=b.utc(a),d=b.utc(c).startOf("month"),e=b.utc(c).startOf("year"),g=b.utc(c).endOf("month"),h=b.utc(d).subtract(Math.abs(d.weekday()),"days"),i="YYYY-MMM-DD",j=r(v.$modelValue,i),k=b().format(i),l={previousView:"month",currentView:"day",nextView:"day"===w.minView?"setTime":"hour",previousViewDate:new f({utcDateValue:e.valueOf(),display:d.format("YYYY-MMM")}),leftDate:new f({utcDateValue:b.utc(d).subtract(1,"months").valueOf()}),rightDate:new f({utcDateValue:b.utc(d).add(1,"months").valueOf()}),dayNames:[],weeks:[]},m=0;7>m;m+=1)l.dayNames.push(b.utc().weekday(m).format("dd"));for(var n=0;6>n;n+=1){for(var o={dates:[]},p=0;7>p;p+=1){var q=b.utc(h).add(7*n+p,"days"),s={active:q.format(i)===j,current:q.format(i)===k,display:q.format("D"),future:q.isAfter(g),past:q.isBefore(d),utcDateValue:q.valueOf()};o.dates.push(new f(s))}l.weeks.push(o)}return l}function m(a){for(var c=b.utc(a).startOf("day"),d=b.utc(c).startOf("month"),e="YYYY-MM-DD H",g=r(v.$modelValue,e),h=b().format(e),i={previousView:"day",currentView:"hour",nextView:"hour"===w.minView?"setTime":"minute",previousViewDate:new f({utcDateValue:d.valueOf(),display:c.format("ll")}),leftDate:new f({utcDateValue:b.utc(c).subtract(1,"days").valueOf()}),rightDate:new f({utcDateValue:b.utc(c).add(1,"days").valueOf()}),dates:[]},j=0;24>j;j+=1){var k=b.utc(c).add(j,"hours"),l={active:k.format(e)===g,current:k.format(e)===h,display:k.format("LT"),utcDateValue:k.valueOf()};i.dates.push(new f(l))}return i}function n(a){for(var c=b.utc(a).startOf("hour"),d=b.utc(c).startOf("day"),e="YYYY-MM-DD H:mm",g=r(v.$modelValue,e),h=b().format(e),i={previousView:"hour",currentView:"minute",nextView:"setTime",previousViewDate:new f({utcDateValue:d.valueOf(),display:c.format("lll")}),leftDate:new f({utcDateValue:b.utc(c).subtract(1,"hours").valueOf()}),rightDate:new f({utcDateValue:b.utc(c).add(1,"hours").valueOf()}),dates:[]},j=60/w.minuteStep,k=0;j>k;k+=1){var l=b.utc(c).add(k*w.minuteStep,"minute"),m={active:l.format(e)===g,current:l.format(e)===h,display:l.format("LT"),utcDateValue:l.valueOf()};i.dates.push(new f(m))}return i}function o(a){var c=new Date(a),d=new Date(c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate(),c.getUTCHours(),c.getUTCMinutes(),c.getUTCSeconds(),c.getUTCMilliseconds());switch(w.modelType){case"Date":break;case"moment":d=b([c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate(),c.getUTCHours(),c.getUTCMinutes(),c.getUTCSeconds(),c.getUTCMilliseconds()]);break;case"milliseconds":d=a;break;default:d=b([c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate(),c.getUTCHours(),c.getUTCMinutes(),c.getUTCSeconds(),c.getUTCMilliseconds()]).format(w.modelType)}var f=v.$modelValue;return v.$setViewValue(d),w.dropdownSelector&&jQuery(w.dropdownSelector).dropdown("toggle"),e.onSetTime({newDate:d,oldDate:f}),x[w.startView](a)}function p(){e.changeView(w.startView,new f({utcDateValue:t(v.$viewValue)}))}function q(a){var c=10*parseInt(b.utc(a).year()/10,10);return b.utc(a).year(c).startOf("year")}function r(a,b){return a?s(a).format(b):""}function s(c){return b(c,a.isString(c)?w.parseFormat:void 0)}function t(a){var b=new Date;if(a){var c=s(a);if(!c.isValid())throw new Error("Invalid date: "+a);b=c.toDate()}return b.getTime()-6e4*b.getTimezoneOffset()}function u(){var b={};h.datetimepickerConfig&&(b=e.$parent.$eval(h.datetimepickerConfig));var f=a.extend({},c,b);return d.validate(f),f}var v=g.controller("ngModel"),w=u();e.screenReader=w.screenReader,e.changeView=i,v.$render=p,w.configureOn&&e.$on(w.configureOn,function(){w=u(),e.screenReader=w.screenReader,v.$render()}),w.renderOn&&e.$on(w.renderOn,v.$render);var x={year:j,month:k,day:l,hour:m,minute:n,setTime:o}}function f(){var a=new Date(arguments[0].utcDateValue),b=6e4*a.getTimezoneOffset();this.utcDateValue=a.getTime(),this.selectable=!0,this.localDateValue=function(){return this.utcDateValue+b};var c=["active","current","display","future","past","selectable","utcDateValue"],d=arguments[0];Object.keys(d).filter(function(a){return c.indexOf(a)>=0}).forEach(function(a){this[a]=d[a]},this)}var g={bindToController:!1,controller:e,controllerAs:"dateTimePickerController",replace:!0,require:"ngModel",restrict:"E",scope:{beforeRender:"&",onSetTime:"&"},templateUrl:"templates/datetimepicker.html"};return e.$inject=["$scope","$element","$attrs"],g}function d(){var c={configureOn:null,dropdownSelector:null,minuteStep:5,minView:"minute",modelType:"Date",parseFormat:"YYYY-MM-DDTHH:mm:ss.SSSZZ",renderOn:null,startView:"day"},d={bg:{previous:"предишна",next:"следваща"},ca:{previous:"anterior",next:"següent"},da:{previous:"forrige",next:"næste"},de:{previous:"vorige",next:"weiter"},"en-au":{previous:"previous",next:"next"},"en-gb":{previous:"previous",next:"next"},en:{previous:"previous",next:"next"},"es-us":{previous:"atrás",next:"siguiente"},es:{previous:"atrás",next:"siguiente"},fi:{previous:"edellinen",next:"seuraava"},fr:{previous:"précédent",next:"suivant"},hu:{previous:"előző",next:"következő"},it:{previous:"precedente",next:"successivo"},ja:{previous:"前へ",next:"次へ"},ml:{previous:"മുൻപുള്ളത്",next:"അടുത്തത്"},nl:{previous:"vorige",next:"volgende"},pl:{previous:"poprzednia",next:"następna"},"pt-br":{previous:"anteriores",next:"próximos"},pt:{previous:"anterior",next:"próximo"},ro:{previous:"anterior",next:"următor"},ru:{previous:"предыдущая",next:"следующая"},sk:{previous:"predošlá",next:"ďalšia"},sv:{previous:"föregående",next:"nästa"},tr:{previous:"önceki",next:"sonraki"},uk:{previous:"назад",next:"далі"},"zh-cn":{previous:"上一页",next:"下一页"},"zh-tw":{previous:"上一頁",next:"下一頁"}},e=d[b.locale().toLowerCase()];return a.extend({},c,{screenReader:e})}function e(b){function c(c){var d=["configureOn","dropdownSelector","minuteStep","minView","modelType","parseFormat","renderOn","startView","screenReader"],e=Object.keys(c).filter(function(a){return d.indexOf(a)<0});if(e.length)throw new Error("Invalid options: "+e.join(", "));var f=["minute","hour","day","month","year"];if(f.indexOf(c.startView)<0)throw new Error("invalid startView value: "+c.startView);if(f.indexOf(c.minView)<0)throw new Error("invalid minView value: "+c.minView);if(f.indexOf(c.minView)>f.indexOf(c.startView))throw new Error("startView must be greater than minView");if(!a.isNumber(c.minuteStep))throw new Error("minuteStep must be numeric");if(c.minuteStep<=0||c.minuteStep>=60)throw new Error("minuteStep must be greater than zero and less than 60");if(null!==c.configureOn&&!a.isString(c.configureOn))throw new Error("configureOn must be a string");if(null!==c.configureOn&&c.configureOn.length<1)throw new Error("configureOn must not be an empty string");if(null!==c.renderOn&&!a.isString(c.renderOn))throw new Error("renderOn must be a string");if(null!==c.renderOn&&c.renderOn.length<1)throw new Error("renderOn must not be an empty string");if(null!==c.modelType&&!a.isString(c.modelType))throw new Error("modelType must be a string");if(null!==c.modelType&&c.modelType.length<1)throw new Error("modelType must not be an empty string");if("Date"!==c.modelType&&"moment"!==c.modelType&&"milliseconds"!==c.modelType&&(c.parseFormat=c.modelType),null!==c.dropdownSelector&&!a.isString(c.dropdownSelector))throw new Error("dropdownSelector must be a string");null===c.dropdownSelector||"undefined"!=typeof jQuery&&"function"==typeof jQuery().dropdown||(b.error("Please DO NOT specify the dropdownSelector option unless you are using jQuery AND Bootstrap.js. Please include jQuery AND Bootstrap.js, or write code to close the dropdown in the on-set-time callback. \n\nThe dropdownSelector configuration option is being removed because it will not function properly."),delete c.dropdownSelector)}return{validate:c}}a.module("ui.bootstrap.datetimepicker",[]).service("dateTimePickerConfig",d).service("dateTimePickerValidator",e).directive("datetimepicker",c),c.$inject=["dateTimePickerConfig","dateTimePickerValidator"],e.$inject=["$log"]}),function(a,b){if("undefined"!=typeof module&&module.exports){var c="undefined"==typeof angular?require("angular"):angular;b(c),module.exports="ui.bootstrap.datetimepicker.templates"}else"function"==typeof define&&define.amd?define(["angular"],b):b(a.angular,a.moment)}(this,function(a){a.module("ui.bootstrap.datetimepicker").run(["$templateCache",function(a){a.put("templates/datetimepicker.html",'<div class="datetimepicker table-responsive">\n    <table class="table table-condensed {{ data.currentView }}-view">\n        <thead>\n        <tr>\n            <th class="left" data-ng-click="changeView(data.currentView, data.leftDate, $event)" data-ng-show="data.leftDate.selectable"><i class="glyphicon glyphicon-arrow-left"><span class="sr-only">{{ screenReader.previous }}</span></i>\n            </th>\n            <th class="switch" colspan="5" data-ng-show="data.previousViewDate.selectable" data-ng-click="changeView(data.previousView, data.previousViewDate, $event)">{{ data.previousViewDate.display }}</th>\n            <th class="right" data-ng-click="changeView(data.currentView, data.rightDate, $event)" data-ng-show="data.rightDate.selectable"><i class="glyphicon glyphicon-arrow-right"><span class="sr-only">{{ screenReader.next }}</span></i>\n            </th>\n        </tr>\n        <tr>\n            <th class="dow" data-ng-repeat="day in data.dayNames">{{ day }}</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr data-ng-if="data.currentView !== \'day\'">\n            <td colspan="7">\n                          <span class="{{ data.currentView }}" data-ng-repeat="dateObject in data.dates" data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}" data-ng-click="changeView(data.nextView, dateObject, $event)">{{ dateObject.display }}</span></td>\n        </tr>\n        <tr data-ng-if="data.currentView === \'day\'" data-ng-repeat="week in data.weeks">\n            <td data-ng-repeat="dateObject in week.dates" data-ng-click="changeView(data.nextView, dateObject, $event)" class="day" data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}">{{ dateObject.display }}</td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n')}])}),angular.module("appManager").run(["$templateCache",function(a){a.put("views/modals/time.html",'<div class="modal-header"> <h3 class="modal-title" id="modal-title"><i class="glyphicon glyphicon-calendar"></i> {{timeSelected.time}}, {{timeSelected.date | date : \'yyyy/MM/dd\'}}</h3> </div> <div class="modal-body" id="modal-body"> <div class="form-group-vicare"> <div class="label-vicare">Bác sĩ trực</div> <div class="input-vicare"> <input type="text" class="form-control" id="inputEmail3" placeholder="Nhập tên bác sĩ" ng-model="search.name" ng-change="getUser()"> <div class="list-professional" ng-if="search.items.length"> <ul class="list-unstyled"> <li ng-repeat="user in search.items" ng-click="addPro(user)">{{user.id}}: {{user.name}}</li> </ul> </div> </div> </div> <div> <table class="table"> <thead> <tr> <th>STT</th> <th>Bác sĩ</th> <th></th> </tr> </thead> <tbody> <tr ng-repeat="item in search.user"> <td>{{$index}}</td> <td>{{item.name}}</td> <td><button class="btn btn-danger btn-sm" ng-click="removePro($index)"><i class="glyphicon glyphicon-remove"></i></button></td> </tr> </tbody> </table> </div> </div> <div class="modal-footer"> <button class="btn btn-primary" type="button" ng-click="added()">OK</button> <button class="btn btn-warning" type="button" ng-click="">Cancel</button> </div>'),a.put("views/states/chat.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="bg-light lter b-b wrapper-md"> <h1 class="m-n font-thin h3">Danh sách bác sĩ trực </h1> </div> <div class="wrapper-md"> <div class="panel panel-default"> <div class="panel-heading"> Danh sách </div> <div class="row wrapper"> <div class="col-sm-5 m-b-xs"> </div> <div class="col-sm-4"> </div> <div class="col-sm-3"> <div class="input-group"> <input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="dt" is-open="popup1.opened" ng-required="true" close-text="Close" alt-input-formats="altInputFormats"> <span class="input-group-btn"> <button type="button" class="btn btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button> </span> </div> </div> </div> <div class="table-responsive"> <table class="table table-striped b-t b-light"> <thead> <tr> <th style="width:100px" class="text-center"> Thời gian </th> <th> Bác sĩ trực </th> <th class="text-center"> </th> </tr> </thead> <tbody> <tr ng-repeat="item in data.times" ng-click="addCalendar(item)"> <td class="text-center">{{item.time}}</td> <td> <span ng-if="item.professional.length">Hiện có {{item.professional.length}} bác sĩ đang trực</span> <span ng-if="!item.professional.length">Hiện không có bác sĩ nào trực</span> </td> <td class="text-center"> <i class="fa fa-check text-success" ng-if="item.professional.length"></i> <i class="glyphicon glyphicon-remove text-error" ng-if="!item.professional.length"></i> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div>'),a.put("views/states/dashboard.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="bg-light lter b-b wrapper-md"> <h1 class="m-n font-thin h3">Danh sách các câu hỏi đến từ app</h1> </div> <div class="wrapper-md"> <div class="panel panel-default"> <div class="panel-heading"> Danh sách </div> <div class="row wrapper"> <div class="col-sm-5 m-b-xs"> <select class="input-sm form-control w-sm inline v-middle"> <option value="0">Bulk action</option> <option value="1">Delete selected</option> <option value="2">Bulk edit</option> <option value="3">Export</option> </select> <button class="btn btn-sm btn-default">Apply</button> </div> <div class="col-sm-4"> </div> <div class="col-sm-3"> <div class="input-group"> <input type="text" class="input-sm form-control" placeholder="Search"> <span class="input-group-btn"> <button class="btn btn-sm btn-default" type="button">Go!</button> </span> </div> </div> </div> <div class="table-responsive"> <table class="table table-striped b-t b-light"> <thead> <tr> <th style="width:20px"> STT </th> <th> Thread ID </th> <th>Thời gian tạo</th> <th>Link</th> <th> Đã trả lời </th> </tr> </thead> <tbody> <tr ng-repeat="item in data.questions"> <td>{{$index}}</td> <td>{{item.thread.id}}</td> <td>{{item.createdAt | date: \'short\'}}</td> <td><a href="{{\'https://vicare.vn\' + item.thread.absolute_url}}" target="_blank">{{\'https://vicare.vn\' + item.thread.absolute_url}}</a></td> <td class="text-center"><label class="i-checks m-b-none"><input type="checkbox" ng-model="item.active" ng-change="updateStatus(item)"><i></i></label></td> </tr> </tbody> </table> </div> </div> </div> </div> </div>'),a.put("views/states/order-detail.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="wrapper-md"> <div class="panel panel-default"> <div class="panel-heading font-bold"> Thông tin Order {{data.order._id}} </div> <div class="panel-body"> <form class="form-horizontal"> <div class="form-group"> <label class="col-sm-2 control-label">Tên khách hàng</label> <div class="col-sm-10"> <div class="form-control">{{data.order.user.name}}</div> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Thời gian tạo</label> <div class="col-sm-10"> <div class="form-control">{{data.order.createdAt | date:\'short\'}}</div> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Chuyên khoa</label> <div class="col-sm-10"> <div class="form-control">{{data.order.speciality}}</div> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Thời gian</label> <div class="col-sm-10"> <div class="form-control">{{data.order.time}}</div> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Tên khách hàng</label> <div class="col-sm-10"> <div class="form-control">{{data.order.user.name}}</div> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Tên bác sĩ</label> <div class="col-sm-10"> <ui-select ng-model="data.order.professional" theme="bootstrap" reset-search-input="false" title="Chọn bác sĩ"> <ui-select-match placeholder="tên bác sĩ...">{{data.order.professional.name}}</ui-select-match> <ui-select-choices repeat="professional in data.professionals track by $index" refresh="refreshProfessional($select.search)" refresh-delay="0"> <div ng-bind-html="professional.name | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Thời gian mở chat</label> <div class="col-sm-5"> <div class="label label-primary">Bắt đầu {{data.order.open | date:\'short\'}}</div> <datetimepicker data-ng-model="data.order.open"></datetimepicker> </div> <div class="col-sm-5"> <div class="label label-primary">Kết thúc {{data.order.end | date:\'short\'}}</div> <datetimepicker data-ng-model="data.order.end"></datetimepicker> </div> </div> <div class="form-group"> <div class="col-sm-4 col-sm-offset-2"> <button type="submit" class="btn btn-primary" ng-click="saveOrder()" ng-disabled="!data.order.open || !data.order.end || !data.order.professional">Lưu thay đổi</button> </div> </div> </form> </div> </div> </div> </div> </div>'),a.put("views/states/order.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="bg-light lter b-b wrapper-md"> <h1 class="m-n font-thin h3">Danh sách orders</h1> </div> <div class="wrapper-md"> <div class="panel panel-default"> <div class="panel-heading"> Danh sách </div> <div class="table-responsive"> <table class="table table-striped b-t b-light"> <thead> <tr> <th> Thời gian tạo </th> <th> Khách hàng </th> <th> Chuyên khoa </th> <th> Ghi chú </th> <th> Trạng thái </th> </tr> </thead> <tbody> <tr ng-repeat="item in data.orders" ng-click="goToOrder(item._id)"> <td>{{item.createdAt | date: \'short\'}}</td> <td> {{item.user.name}} </td> <td> {{item.speciality}} </td> <td> {{item.time}} </td> <td>Chưa xử lý</td> </tr> </tbody> </table> </div> </div> </div> </div> </div>'),a.put("views/states/report-all.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="bg-light lter b-b wrapper-md"> <h1 class="m-n font-thin h3">Danh sách chat hiện có</h1> </div> <div class="wrapper-md"> <div class="panel panel-default"> <div class="panel-heading"> Danh sách </div> <div class="table-responsive"> <div class="row wrapper"> <div class="col-sm-5 m-b-xs"> <select class="input-sm form-control w-sm inline v-middle" ng-model="data.selectFilter" ng-change="selectDataFilter(data.selectFilter)"> <option value="1">Tất cả</option> <option value="2">Accept</option> <option value="3">Chưa Accept</option> </select> </div> </div> <table class="table table-striped b-t b-light"> <thead> <tr> <th>STT</th> <th style="width: 140px"> Time tạo </th> <th style="width: 140px"> Time cập nhật </th> <th> Users </th> <th> Accept </th> <th> Tin nhắn cuối </th> </tr> </thead> <tbody> <tr ng-repeat="item in data.reports" ng-click="goHistoryChat(item._id, item)"> <td>{{$index}}</td> <td>{{item.createdAt | date: \'short\'}}</td> <td>{{item.updatedAt | date: \'short\'}}</td> <td> <label class="label bg-info m-l-xs" ng-repeat="data in item.users"> <span ng-if="!data.user.viCare.official_name">{{data.user.viCare.name}}</span> <a ng-if="data.user.viCare.official_name" href="https://vicare.vn/danh-sach/bac-si/{{data.user.viCare.user_professional_id}}/" target="_blank">{{data.user.viCare.official_name}}</a> </label> </td> <td> <i class="fa fa-check text-success" ng-if="!item.request"></i> </td> <td> {{item.lastMessage}} </td> </tr> </tbody> </table> </div> </div> </div> </div> </div>'),a.put("views/states/report-detail.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="wrapper"> <div class="padder-lg m-b-lg"> <label class="label bg-info m-l-xs" ng-repeat="data in data.chanel.users"> <span ng-if="!data.user.viCare.official_name">{{data.user.viCare.name}}</span> <a ng-if="data.user.viCare.official_name" href="https://vicare.vn/danh-sach/bac-si/{{data.user.viCare.user_professional_id}}/">{{data.user.viCare.official_name}}</a> </label> </div> <ul class="timeline"> <li class="tl-header"> <div class="btn btn-info">Start</div> </li> <li class="tl-item item-chat" ng-repeat="item in data.messages" ng-class="{\'tl-left\': item.active}"> <div class="tl-wrap"> <span class="tl-date">{{item.createdAt | date:\'short\'}}</span> <div class="tl-content panel padder b-a" ng-class="{\'bg-success\': item.active}"> <span class="arrow left pull-up" ng-if="!item.active"></span> <span class="arrow arrow-success left pull-up hidden-left" ng-if="item.active"></span> <span class="arrow arrow-success right pull-up visible-left" ng-if="item.active"></span> <img ng-if="!item.from.viCare.official_image" ng-src="{{item.from.viCare.small_avatar}}" alt=""> <img ng-if="item.from.viCare.official_image" ng-src="{{item.from.viCare.official_image}}" alt=""> <div ng-if="!item.from.viCare.official_name"><b>{{item.from.viCare.name}}</b></div> <div ng-if="item.from.viCare.official_name"><b>{{item.from.viCare.official_name}}</b></div> <div ng-if="item.text" ng-class="{\'text-lt\': item.active}">{{item.text}}</div> </div> </div> </li> <!--<li class="tl-item tl-left">--> <!--<div class="tl-wrap b-success">--> <!--<span class="tl-date">7:30 am</span>--> <!--<div class="tl-content panel bg-success padder">--> <!--<span class="arrow arrow-success left pull-up hidden-left"></span>--> <!--<span class="arrow arrow-success right pull-up visible-left"></span>--> <!--<div class="text-lt">Oh! Colorful</div>--> <!--</div>--> <!--</div>--> <!--</li>--> <li class="tl-header"> <div class="btn btn-sm btn-default btn-rounded">End</div> </li> </ul> </div> </div> </div>'),a.put("views/states/report.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="bg-light lter b-b wrapper-md"> <h1 class="m-n font-thin h3">Danh sách chat hiện có</h1> </div> <div class="wrapper-md"> <div class="panel panel-default"> <div class="panel-heading"> Danh sách </div> <div class="table-responsive"> <table class="table table-striped b-t b-light"> <thead> <tr> <th>STT</th> <th style="width: 140px"> Time tạo </th> <th style="width: 140px"> Time cập nhật </th> <th> Users </th> <th> Tin nhắn cuối </th> </tr> </thead> <tbody> <tr ng-repeat="item in data.reports" ng-click="goHistoryChat(item._id, item)"> <td>{{$index}}</td> <td>{{item.createdAt | date: \'short\'}}</td> <td>{{item.updatedAt | date: \'short\'}}</td> <td> <label class="label bg-info m-l-xs" ng-repeat="data in item.users"> <span ng-if="!data.user.viCare.official_name">{{data.user.viCare.name}}</span> <a ng-if="data.user.viCare.official_name" href="https://vicare.vn/danh-sach/bac-si/{{data.user.viCare.user_professional_id}}/" target="_blank">{{data.user.viCare.official_name}}</a> </label> </td> <td> {{item.lastMessage}} </td> </tr> </tbody> </table> </div> </div> </div> </div> </div>'),
a.put("views/states/setting.html",'<div id="content" class="app-content" role="main"> <div class="app-content-body"> <div class="bg-light lter b-b wrapper-md"> <h1 class="m-n font-thin h3">Cài đặt</h1> </div> <div class="wrapper-md ng-scope"> <div class="panel panel-default"> <div class="panel-heading font-bold">Cài đặt cho ứng dụng</div> <div class="panel-body"> <form class="bs-example form-horizontal ng-pristine ng-valid"> <div class="form-group"> <label class="col-lg-2 control-label">Phiên bản ứng dụng</label> <div class="col-lg-10"> <input type="text" class="form-control" placeholder="1.1.0" ng-model="data.setting.version"> </div> </div> <div class="form-group"> <div class="col-lg-offset-2 col-lg-10"> <div class="checkbox"> <label class="i-checks"> <input type="checkbox" ng-model="data.setting.needUpdate"><i></i> Bật chế độ bắt buộc cập nhật app </label> </div> </div> </div> <div class="form-group"> <div class="col-lg-offset-2 col-lg-10"> <div class="checkbox"> <label class="i-checks"> <input type="checkbox" ng-model="data.setting.openChat"><i></i> Bật chế độ chat trên app </label> </div> </div> </div> <div class="form-group"> <div class="col-lg-offset-2 col-lg-10"> <button type="submit" class="btn btn-sm btn-info" ng-click="changeOpenChat()">Cập nhật</button> </div> </div> </form> </div> </div> </div> </div> </div>')}]);