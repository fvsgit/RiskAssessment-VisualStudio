/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var h=function(a){if(a.getTitle()){return true;}else{var s=a.getParent().getParent();return s.getContent().some(function(c){return c.getVisible();});}};var g=function(e){var s=[];var l;var t;if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){l=e.getLabel();if(l){s.push(l);}s=s.concat(e.getFields());}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){t=e.getTitle()||e.getToolbar();if(t){s[0]=t;}e.getFormElements().forEach(function(a){l=a.getLabel();if(l){s.push(l);}s=s.concat(a.getFields());});}return s;};var f={aggregations:{formContainers:{childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},getIndex:function(a,b){var c=a.getFormContainers();if(b){return c.indexOf(b)+1;}if(c[0].getFormElements().length===0&&c[0].getTitle()===null){return 0;}return c.length;},beforeMove:function(s){if(s){s._bChangedByMe=true;}},afterMove:function(s){if(s){s._bChangedByMe=false;}},actions:{move:{changeType:"moveSimpleFormGroup"},createContainer:{changeType:"addSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:function(a){var b=a.getFormContainers();for(var i=0;i<b.length;i++){if(b[i].getToolbar&&b[i].getToolbar()){return false;}}return true;},getCreatedContainerId:function(n){var t=sap.ui.getCore().byId(n);var p=t.getParent().getId();return p;}}}}},getStableElements:g};var F={name:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},aggregations:{formElements:{childNames:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},beforeMove:function(s){if(s){s._bChangedByMe=true;}},afterMove:function(s){if(s){s._bChangedByMe=false;}},actions:{move:{changeType:"moveSimpleFormField"}}}},actions:{rename:function(r){return{changeType:"renameTitle",changeOnRelevantContainer:true,isEnabled:!(r.getToolbar()||!r.getTitle()),domRef:function(c){if(c.getTitle&&c.getTitle()){return c.getTitle().getDomRef();}}};},remove:function(r){return{changeType:"removeSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:!(!r.getToolbar()&&!h.call(this,r)),getConfirmationText:function(r){var c=false;if(r.getMetadata().getName()==="sap.ui.layout.form.FormContainer"&&r.getToolbar&&r.getToolbar()){var t=r.getToolbar().getContent();if(t.length>1){c=true;}else if((t.length===1)&&(!t[0].getMetadata().isInstanceOf("sap.ui.core.Label")&&!t[0]instanceof sap.ui.core.Title&&!t[0]instanceof sap.m.Title)){c=true;}}if(c){var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout");return T.getText("MSG_REMOVING_TOOLBAR");}},getState:function(s){var c=s.getContent();return{content:c.map(function(e){return{element:e,visible:e.getVisible?e.getVisible():undefined,index:c.indexOf(e)};})};},restoreState:function(s,S){s.removeAllContent();S.content.forEach(function(e){s.insertContent(e.element,e.index);if(e.element.setVisible){e.element.setVisible(e.visible);}});}};}},getStableElements:g};var o={name:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},actions:{rename:{changeType:"renameLabel",changeOnRelevantContainer:true,domRef:function(c){return c.getLabel().getDomRef();}},remove:{changeType:"hideSimpleFormField",changeOnRelevantContainer:true,getState:function(s){var c=s.getContent();return{content:c.map(function(e){return{element:e,visible:e.getVisible?e.getVisible():undefined,index:c.indexOf(e)};})};},restoreState:function(s,S){s.removeAllContent();S.content.forEach(function(e){s.insertContent(e.element,e.index);if(e.element.setVisible){e.element.setVisible(e.visible);}});}},reveal:{changeType:"unhideSimpleFormField",changeOnRelevantContainer:true}},getStableElements:g};return{aggregations:{content:{ignore:true},title:{ignore:true},toolbar:{ignore:function(s){return!s.getToolbar();},domRef:function(s){return s.getToolbar().getDomRef();}},form:{ignore:false,propagateMetadata:function(e){var t=e.getMetadata().getName();if(t==="sap.ui.layout.form.Form"){return f;}else if(t==="sap.ui.layout.form.FormContainer"){return F;}else if(t==="sap.ui.layout.form.FormElement"){return o;}else{return{actions:null};}},propagateRelevantContainer:true}}};},false);
