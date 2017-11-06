/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/support/Plugin'],function(q,P){"use strict";var _=[];var c=0;var d=0;var f=250;var g=false;var h;var j={selectedInterval:{start:0,end:0},nodes:{slider:null,handle:null,leftResizeHandle:null,rightResizeHandle:null},consts:{LEFT_HANDLE_ID:'left',RIGHT_HANDLE_ID:'right'},sizes:{width:0,handleWidth:0,handleMinWidth:10},drag:{handleClickOffsetX:0,handleOffsetLeft:0,isResize:false,whichResizeHandle:''}};var k=P.extend("sap.ui.core.support.plugins.Performance",{constructor:function(o){P.apply(this,["sapUiSupportPerf","Performance",o]);h=this;this._oStub=o;if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetMeasurements",this.getId()+"SetActive"];}else{this._aEventIds=[this.getId()+"Refresh",this.getId()+"Clear",this.getId()+"Start",this.getId()+"End",this.getId()+"Activate"];}}});k.prototype.init=function(o){P.prototype.init.apply(this,arguments);if(this.runsAsToolPlugin()){l.call(this,o);}else{m.call(this,o);}};k.prototype.exit=function(o){P.prototype.exit.apply(this,arguments);};function l(o){var a=sap.ui.getCore().createRenderManager();a.write(u());a.flush(this.$().get(0));a.destroy();x();}function m(o){n.call(this);}function n(o){var a=q.sap.measure.getAllMeasurements(true);this._oStub.sendEvent(this.getId()+"SetMeasurements",{"measurements":a});}k.prototype.onsapUiSupportPerfSetMeasurements=function(e){var a=e.getParameter("measurements");this.setData(a);};k.prototype.onsapUiSupportPerfRefresh=function(e){n.call(this);};k.prototype.onsapUiSupportPerfClear=function(e){q.sap.measure.clear();this._oStub.sendEvent(this.getId()+"SetMeasurements",{"measurements":[]});};k.prototype.onsapUiSupportPerfStart=function(e){q.sap.measure.start(this.getId()+"-perf","Measurement by support tool");};k.prototype.onsapUiSupportPerfEnd=function(e){q.sap.measure.end(this.getId()+"-perf");n.call(this);};k.prototype.onsapUiSupportPerfActivate=function(e){q.sap.measure.setActive(true);};k.prototype.setData=function(e){var i=document.querySelector('#sapUiSupportNoDataOverlay');var o=document.querySelector('#slider');var d1=document.querySelector('#sapUiSupportPerfHeaderTimelineOverview .timeline');if(e.length===0){i.style.display='block';o.classList.add('sapUiSupportHidden');d1.innerHTML='';return;}else{o.classList.remove('sapUiSupportHidden');i.style.display='';}_=(JSON.parse(JSON.stringify(e)));_=_.sort(function(a,b){return a.start-b.start;});var e1=e[0].start;_=_.map(function(a){a.start=parseFloat((a.start-e1).toFixed(2));a.end=parseFloat((a.end-e1).toFixed(2));a.uid=w();return a;});d=_[_.length-1].end-_[0].start;j.selectedInterval.start=_[0].start;j.selectedInterval.end=_[_.length-1].end;U();A(_);B(_);S();};var t=10;var p=0;var r;function s(e){clearInterval(r);if(g){g=false;h._oStub.sendEvent(h.getId()+"End");e.target.setAttribute('data-state','Start recording ('+(p/1000).toFixed(2)+' s)');}else{p=0;g=true;h._oStub.sendEvent(h.getId()+"Activate");h._oStub.sendEvent(h.getId()+"Clear");h._oStub.sendEvent(h.getId()+"Start");e.target.setAttribute('data-state','Stop recording ('+(p/1000).toFixed(2)+' s)');r=setInterval(function(){p+=t;e.target.setAttribute('data-state','Stop recording ('+(p/1000).toFixed(2)+' s)');},t);}}function u(){return''+'<section id="sapUiSupportPerf">'+'<section id="sapUiSupportNoDataOverlay"></section>'+'<section id="sapUiSupportPerfHeader">'+'<div class="sapUiSupportToolbar">'+'<label class="sapUiSupportLabel">Order:</label>'+'<select id="sapUiSupportPerfHeaderFilterSort" class="sapUiSupportTxtFld sapUiSupportSelect" name="orderBy">'+'<option value="chronologically">Chronologically</option>'+'<option value="time">By Time</option>'+'<option value="duration">By Duration</option>'+'</select>'+'<label class="sapUiSupportLabel">Min. Duration:</label>'+'<input id="sapUiSupportPerfHeaderFilterMinDuration" type="number" min="0" value="0" />'+'<label class="sapUiSupportLabel"> ms.</label>'+'<div class="flex-spacer"></div>'+'<div id="categories"></div>'+'</div>'+'<section id="sapUiSupportPerfHeaderTimelineOverview">'+'<div class="timeline"></div>'+'<button id="sapUiSupportPerfToggleRecordingBtn"></button>'+'<div id="slider">'+'<div id="slideHandle">'+'<span id="leftHandle"></span>'+'<span id="rightHandle"></span>'+'</div>'+'</div>'+'</section>'+'</section>'+'<section id="sapUiSupportPerfHeaderTimeline">'+'<div id="sapUiSupportPerfHeaderTimelineBarInfoWrapper"></div>'+'<div id="sapUiSupportPerfHeaderTimelineBarWrapper"></div>'+'</section>'+'</section>';}function v(i){return _.reduce(function(a,b){if(b.uid===i){a=b;}return a;},null);}function w(){return'uID-'+(w.id!==undefined?++w.id:w.id=0);}function x(){document.querySelector('#sapUiSupportPerfHeaderFilterSort').addEventListener('change',B,false);document.querySelector('#sapUiSupportPerfHeaderFilterMinDuration').addEventListener('change',B,false);document.querySelector('#categories').addEventListener('change',B,false);document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper').addEventListener('mouseover',K,false);document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper').addEventListener('mouseover',K,false);window.addEventListener('resize',function(){B();V();},false);window.addEventListener('keydown',Y);q("#slideHandle").on('dblclick',U);q("#sapUiSupportPerfToggleRecordingBtn").click(s).attr('data-state','Start recording');}function y(a,b){return'Duration: '+a.toFixed(2)+' ms.\nTime: '+b.toFixed(2)+' ms.';}function z(a){var b=50;var e=d/b;var o=[];for(var i=0;i<b;i++){var d1=e*i;var e1=d1+e;var f1=R({start:d1,end:e1},a);var g1=f1.map(function(k1){return{category:k1.categories[0],duration:k1.duration};});var h1={_total:0};g1.map(function(k1){if(!h1[k1.category]){h1[k1.category]=0;}h1._total+=k1.duration;h1[k1.category]=h1[k1.category]+k1.duration;});var i1=f1.map(function(k1){return{category:k1.categories[0],time:k1.time};});var j1={_total:0};i1.map(function(k1){if(!j1[k1.category]){j1[k1.category]=0;}j1._total+=k1.time;j1[k1.category]=j1[k1.category]+k1.time;});o.push({duration:h1,time:j1});}return o;}function A(a){var e=document.querySelector('#sapUiSupportPerfHeaderTimelineOverview .timeline');var i='<ol>';var o=(JSON.parse(JSON.stringify(a)));var d1=o.map(function(b){return b.duration;}).reduce(function(j1,b){return j1+b;});var e1=o.map(function(b){return b.time;}).reduce(function(j1,b){return j1+b;});var f1=z(o);var g1={time:{_total:0}};var h1={duration:{_total:0}};f1.forEach(function(b){if(g1.time._total<b.time._total){g1=b;}if(h1.duration._total<b.duration._total){h1=b;}});e1=g1.time._total;d1=h1.duration._total;function i1(b,j1){var i='';Object.keys(b.duration).sort().forEach(function(k1){if(k1!=='_total'){var l1=(b[j1][k1]/b[j1]._total)*100;i+='<div class="'+G(k1)+'" style="height: '+l1.toFixed(2)+'%;"></div>';}});return i;}f1.forEach(function(b){var j1=Math.ceil((b.duration._total/d1)*100);var k1=Math.ceil((b.time._total/e1)*100);var l1='height: '+j1+'%;';if(j1>0){l1+=' min-height: 1px;';}var m1='height: '+k1+'%;';if(k1>0){m1+=' min-height: 1px;';}i+='<li>';i+='<div class="bars-wrapper" title="'+y(b.duration._total,b.time._total)+'">';i+='<div class="duration" style="'+l1+'">';i+=i1(b,'duration');i+='</div>';i+='<div class="time" style="'+m1+'">';i+=i1(b,'time');i+='</div>';i+='</div></li>';});i+='</ol>';e.innerHTML=i;}function B(){var a='<ol>';var b='<ol>';var e=M();var i=L(_,e);if(i.length===0){a+='<li class="line nodata" data-uid="'+-1+'"></li>';b+='<li class="line nodata" data-uid="'+-1+'"><div class="info line">No data</div></li>';}i.forEach(function(o){var d1=v(o.uid);a+='<li data-uid="'+o.uid+'" class="line" title="'+E(d1)+'"'+J(d1)+'  >';a+='<div class="bar '+H(d1.duration)+'" style="width: '+C(o.duration)+' margin-left: '+D(o,e.filterByTime.start)+'">';a+='<div class="sub-bar '+H(d1.time)+'" style="width: '+C(o.time)+'"></div>';a+='</div>';a+='</li>';b+='<li data-uid="'+o.uid+'" title="'+E(d1)+'" class="line '+G(d1.categories[0])+'" '+J(d1)+'>';b+='<div class="info line">'+F(d1)+' ('+(d1.time).toFixed(0)+' ms)</div>';b+='</li>';});a+='</ol>';b+='</ol>';document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper').innerHTML=a;document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper').innerHTML=b;T(e);N();}function C(a){var b=(a*c);var e=Math.max(b,1);return e+'px;';}function D(b,a){var o=(b.start-a)*c;return o.toFixed(0)+'px';}function E(b){return q.sap.escapeHTML(b.info+'\nduration: '+b.duration.toFixed(2)+' ms. \ntime: '+b.time.toFixed(2)+' ms. \nstart: '+b.start.toFixed(2)+' ms.\nend: '+b.end.toFixed(2)+' ms.');}function F(b){var a=b.info;a=a.substring(a.lastIndexOf('/')+1,a.length);a=a.substring(a.lastIndexOf('sap.m.'),a.length);a=a.replace('Rendering of ','');return q.sap.escapeHTML(a);}function G(a){var b='unknownType';if(a.indexOf("require")!==-1){b='requireModuleType';}else if(a.indexOf("xmlhttprequest")!==-1){b='requestType';}else if(a.indexOf("javascript")!==-1){b='afterRenderingType';}else if(a.indexOf("rendering")!==-1){b='renderingType';}return q.sap.escapeHTML(b);}function H(a){var b='';if(a>200){b='oneTimeStyle';}if(a>500){b='twoTimeStyle';}if(a>1000){b='threeTimeStyle';}if(a>2000){b='fourTimeStyle';}if(a>3000){b='fiveTimeStyle';}if(a>4000){b='sixTimeStyle';}return b;}function I(a){var b=[];a.forEach(function(i){if(b.indexOf(i.categories[0])===-1){b.push(i.categories[0]);}});return b;}function J(b){return'data-item-category = '+b.categories[0];}function K(e){var a=e.srcElement;if(a.classList.contains('info')&&a.nodeName==='DIV'){a=a.parentNode;}if(a.nodeName==='LI'){var b=a.getAttribute('data-uid');var i=document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper li.hover');var o=document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper li.hover');if(i&&o){i.classList.remove('hover');o.classList.remove('hover');}var d1=document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper li[data-uid="'+b+'"]');var e1=document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper li[data-uid="'+b+'"]');if(d1&&e1){d1.classList.add('hover');e1.classList.add('hover');}}}function L(a,b){var e=(JSON.parse(JSON.stringify(a)));var i=document.querySelector('#sapUiSupportPerfHeaderTimeline').offsetWidth-document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper').offsetWidth;var o=20;var d1=1;e=R(b.filterByTime,e);e=O(b.orderByValue,e);e=Q(b.minValue,e);if(e.length){d1=b.filterByTime.end-b.filterByTime.start;}c=((i-o)/d1);return e;}function M(){var o={};var a=document.querySelector('#sapUiSupportPerfHeaderFilterSort');o.orderByValue=a.options[a.selectedIndex].value;o.minValue=document.querySelector('#sapUiSupportPerfHeaderFilterMinDuration').valueAsNumber||0;o.filterByTime={start:j.selectedInterval.start,end:j.selectedInterval.end};return o;}function N(){var a=document.querySelectorAll('#categories input');function b(e,d1){var e1=G(e);var f1=document.querySelectorAll('li[data-item-category="'+e+'"]');var g1=document.querySelectorAll('.timeline .bars-wrapper .'+e1);for(var i=0;i<f1.length;i++){f1[i].style.display=d1?'':'none';}for(var o=0;o<g1.length;o++){g1[o].style.display=d1?'':'none';}}for(var i=0;i<a.length;i++){b(a[i].name,a[i].checked);}}function O(o,e){if(o==='time'||o==='duration'){document.querySelector('body').classList.add('flattenBarOffset');}else{document.querySelector('body').classList.remove('flattenBarOffset');}if(o==='time'){e=e.sort(function(a,b){if(a.time>b.time){return-1;}if(a.time<b.time){return 1;}return 0;});}if(o==='duration'){e=e.sort(function(a,b){if(a.duration>b.duration){return-1;}if(a.duration<b.duration){return 1;}return 0;});}return e;}function Q(a,b){return b.filter(function(i){return(i.duration>=a);});}function R(o,a){return a.filter(function(i){return!(i.end<=o.start||i.start>=o.end);}).map(function(i){var b=Math.max(o.start-i.start,0);var e=Math.max((i.start+i.time)-o.end,0);i.time=i.time-b-e;var d1=Math.max(o.start-i.start,0);var e1=Math.max((i.start+i.duration)-o.end,0);i.duration=i.duration-d1-e1;i.start=Math.max(i.start,o.start);i.end=Math.min(i.end,o.end);return i;});}function S(){var a='';var b=I(_);b.forEach(function(i){i=q.sap.escapeHTML(i);a+='<label title="'+i+'"><input class="'+G(i)+'" checked type="checkbox" name="'+i+'" />'+i+'</label>';});var e=document.querySelector('#categories');e.innerHTML=a;}function T(a){var b=document.getElementById('sapUiSupportPerfHeaderTimelineBarWrapper');var e=Math.round(b.offsetWidth/10);var o=a.filterByTime.end-a.filterByTime.start;var d1=parseInt(o/e,10);if(document.getElementById('grid')){document.getElementById('grid').parentNode.removeChild(document.getElementById('grid'));}var e1=document.createElement('div');e1.innerHTML='<div class="header"></div><div class="body"></div>';e1.id='grid';for(var i=1;i<=e;i++){var f1=document.createElement('div');var g1=document.createElement('div');if(i%5===0||i===1){var h1=parseInt(a.filterByTime.start,10);if(i!==1){h1+=i*d1;}h1=h1>500?(h1/1000).toFixed(2)+' s':h1+' ms';g1.setAttribute('data-time',h1);}e1.querySelector('.body').appendChild(f1);e1.querySelector('.header').appendChild(g1);}document.querySelector('#sapUiSupportPerf').appendChild(e1);}function U(){j.nodes.slider=j.nodes.slider||document.querySelector('#slider');j.nodes.handle=j.nodes.handle||document.querySelector('#slideHandle');j.nodes.leftResizeHandle=j.nodes.leftResizeHandle||document.querySelector('#leftHandle');j.nodes.rightResizeHandle=j.nodes.rightResizeHandle||document.querySelector('#rightHandle');j.nodes.handle.style.left=0;j.nodes.handle.style.width='100%';V();j.nodes.slider.addEventListener('mousedown',W);}function V(){var a=window.getComputedStyle(j.nodes.handle).width;var o=j.sizes.width;j.sizes.handleWidth=parseInt(a,10);j.sizes.width=j.nodes.slider.offsetWidth;if(j.sizes.width!==j.sizes.handleWidth){b1(o);}$();}function W(e){var a=e.target.id;var b=f+(j.sizes.handleWidth/2);var i=Math.max(e.clientX-b,0);var o=j.sizes.width-j.sizes.handleWidth;var d1=Math.min(i,o);if(a===j.nodes.slider.id){j.nodes.handle.style.left=d1+'px';j.drag.handleOffsetLeft=j.nodes.handle.offsetLeft;j.drag.isResize=false;}else if(a===j.nodes.handle.id){j.drag.handleClickOffsetX=e.offsetX;j.drag.isResize=false;}else if(a===j.nodes.leftResizeHandle.id){j.drag.whichResizeHandle=j.consts.LEFT_HANDLE_ID;j.drag.isResize=true;}else if(a===j.nodes.rightResizeHandle.id){j.drag.whichResizeHandle=j.consts.RIGHT_HANDLE_ID;j.drag.isResize=true;}else{return;}window.addEventListener('mousemove',X);window.addEventListener('mouseup',Z);}function X(e){e.stopImmediatePropagation();var a;var b=e.clientX-f;if(j.drag.isResize){a1(e);return;}var i=j.sizes.width-j.sizes.handleWidth+j.drag.handleClickOffsetX;a=Math.max(Math.min(b,i),j.drag.handleClickOffsetX);j.nodes.handle.style.left=a-j.drag.handleClickOffsetX+'px';}function Y(e){var o=0;var a=37;var b=39;var i=5;if(e.keyCode!=a&&e.keyCode!=b){return;}else if(e.keyCode==a){o=-i;}else if(e.keyCode==b){o=i;}var d1=Math.min((j.drag.handleOffsetLeft+o),j.sizes.width-j.sizes.handleWidth);j.drag.handleOffsetLeft=Math.max(d1,0);j.nodes.handle.style.left=j.drag.handleOffsetLeft+'px';c1();B();}function Z(e){e.stopImmediatePropagation();window.removeEventListener('mousemove',X);window.removeEventListener('mouseup',Z);$();}function $(){var a=window.getComputedStyle(j.nodes.handle).width;j.sizes.handleWidth=parseInt(a,10);j.drag.handleOffsetLeft=j.nodes.handle.offsetLeft;var b='(Double click to expand)';j.nodes.slider.setAttribute('title',b);c1();B();}function a1(e){e.stopImmediatePropagation();var a;var b;var i;var o;var d1;var e1;var f1=e.clientX-f;var g1=9;if(j.drag.whichResizeHandle===j.consts.RIGHT_HANDLE_ID){o=f1-j.drag.handleOffsetLeft;a=Math.max(o,j.sizes.handleMinWidth);b=j.sizes.width-j.drag.handleOffsetLeft;i=Math.min(a,b);j.nodes.handle.style.width=i+'px';}if(j.drag.whichResizeHandle===j.consts.LEFT_HANDLE_ID){a=j.drag.handleOffsetLeft+j.sizes.handleWidth-j.sizes.handleMinWidth;f1=Math.max(Math.min(f1,a),0);b=j.drag.handleOffsetLeft+j.sizes.handleWidth;d1=Math.min(f1,j.sizes.width);e1=Math.max(Math.max(d1,-2*j.sizes.handleMinWidth),g1);i=b-e1+9;if(i<=g1+j.sizes.handleMinWidth){i-=g1;e1+=g1;}j.nodes.handle.style.left=(e1-g1)+'px';j.nodes.handle.style.width=i+'px';}}function b1(o){var a=j.sizes.width-o;var b=j.sizes.width-j.drag.handleOffsetLeft;var e=j.sizes.handleWidth+a;j.sizes.handleWidth=Math.max(j.sizes.handleMinWidth,Math.min(e,b));j.nodes.handle.style.width=j.sizes.handleWidth+'px';if(j.sizes.width<(j.drag.handleOffsetLeft+j.sizes.handleWidth)){j.drag.handleOffsetLeft=j.sizes.width-j.sizes.handleWidth;j.nodes.handle.style.left=j.drag.handleOffsetLeft+'px';}}function c1(){if(!_.length){return;}var a=(j.drag.handleOffsetLeft/j.sizes.width)*100;var b=a+(j.sizes.handleWidth/j.sizes.width)*100;var e=_[_.length-1].end/100;j.selectedInterval.start=(a*e).toFixed(0);j.selectedInterval.end=(b*e).toFixed(0);}return k;});
