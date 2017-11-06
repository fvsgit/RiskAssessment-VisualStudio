/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/model/json/JSONModel','sap/ui/layout/form/SimpleForm',"sap/m/Label","sap/m/Text"],function(q,C,J,S,L,T){"use strict";var s=C.extend("sap.ui.dt.test.report.Statistic",{metadata:{properties:{data:{type:"object"}},aggregations:{"_form":{type:"sap.ui.layout.form.SimpleForm",hidden:true,multiple:false}}},init:function(){this._oModel=null;this.setAggregation("_form",this._createForm());},exit:function(){this.setData(null);},setData:function(d){if(this._oModel){this._oModel.destroy();delete this._oModel;}if(d){this._oModel=new J(d);this._getForm().setModel(this._oModel);}else{this._getForm().setModel(null);}this.setProperty("data",d);},_createForm:function(){var f=new sap.ui.layout.form.SimpleForm(this.getId()+"--form",{editable:false,title:"Statistics",content:[new L(this.getId()+"--form-supported-label",{text:"Supported"}),new T(this.getId()+"--form-supported-value",{text:"{/statistic/SUPPORTED}"}),new L(this.getId()+"--form-partial-supported-label",{text:"Partial Supported"}),new T(this.getId()+"--form-partial-supported-value",{text:"{/statistic/PARTIAL_SUPPORTED}"}),new L(this.getId()+"--form-not-supported-label",{text:"Not Supported"}),new T(this.getId()+"--form-not-supported-value",{text:"{/statistic/NOT_SUPPORTED}"}),new L(this.getId()+"--form-unknown-label",{text:"Unknown"}),new T(this.getId()+"--form-unknown-value",{text:"{/statistic/UNKNOWN}"}),new L(this.getId()+"--form-error-label",{text:"Error"}),new T(this.getId()+"--form-error-value",{text:"{/statistic/ERROR}"})]});return f;},_getForm:function(){return this.getAggregation("_form");}});return s;},true);
