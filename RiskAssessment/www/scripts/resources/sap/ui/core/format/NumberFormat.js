/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','sap/ui/core/Locale','sap/ui/core/LocaleData'],function(q,B,L,a){"use strict";var N=B.extend("sap.ui.core.format.NumberFormat",{constructor:function(f){throw new Error();}});var r=/0+(\.0+)?/;var n={INTEGER:"integer",FLOAT:"float",CURRENCY:"currency",PERCENT:"percent"};var R={FLOOR:"floor",CEILING:"ceiling",TOWARDS_ZERO:"towards_zero",AWAY_FROM_ZERO:"away_from_zero",HALF_FLOOR:"half_floor",HALF_CEILING:"half_ceiling",HALF_TOWARDS_ZERO:"half_towards_zero",HALF_AWAY_FROM_ZERO:"half_away_from_zero"};var m={};m[R.FLOOR]=Math.floor;m[R.CEILING]=Math.ceil;m[R.TOWARDS_ZERO]=function(f){return f>0?Math.floor(f):Math.ceil(f);};m[R.AWAY_FROM_ZERO]=function(f){return f>0?Math.ceil(f):Math.floor(f);};m[R.HALF_TOWARDS_ZERO]=function(f){return f>0?Math.ceil(f-0.5):Math.floor(f+0.5);};m[R.HALF_AWAY_FROM_ZERO]=function(f){return f>0?Math.floor(f+0.5):Math.ceil(f-0.5);};m[R.HALF_FLOOR]=function(f){return Math.ceil(f-0.5);};m[R.HALF_CEILING]=Math.round;N.RoundingMode=R;N.oDefaultIntegerFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:0,groupingEnabled:false,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:true,type:n.INTEGER,showMeasure:false,style:"standard",parseAsString:false,roundingMode:N.RoundingMode.TOWARDS_ZERO,emptyString:NaN,showScale:true};N.oDefaultFloatFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:n.FLOAT,showMeasure:false,style:"standard",parseAsString:false,roundingMode:N.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};N.oDefaultPercentFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",percentSign:"%",isInteger:false,type:n.PERCENT,showMeasure:false,style:"standard",parseAsString:false,roundingMode:N.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};N.oDefaultCurrencyFormat={minIntegerDigits:1,maxIntegerDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:n.CURRENCY,showMeasure:true,currencyCode:true,currencyContext:'standard',style:"standard",parseAsString:false,roundingMode:N.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};N.getInstance=function(f,l){return this.getFloatInstance(f,l);};N.getFloatInstance=function(f,l){var F=this.createInstance(f,l),o=this.getLocaleFormatOptions(F.oLocaleData,n.FLOAT);F.oFormatOptions=q.extend(false,{},this.oDefaultFloatFormat,o,f);return F;};N.getIntegerInstance=function(f,l){var F=this.createInstance(f,l),o=this.getLocaleFormatOptions(F.oLocaleData,n.INTEGER);F.oFormatOptions=q.extend(false,{},this.oDefaultIntegerFormat,o,f);return F;};N.getCurrencyInstance=function(f,l){var F=this.createInstance(f,l),C=f&&f.currencyContext,o=this.getLocaleFormatOptions(F.oLocaleData,n.CURRENCY,C);F.oFormatOptions=q.extend(false,{},this.oDefaultCurrencyFormat,o,f);return F;};N.getPercentInstance=function(f,l){var F=this.createInstance(f,l),o=this.getLocaleFormatOptions(F.oLocaleData,n.PERCENT);F.oFormatOptions=q.extend(false,{},this.oDefaultPercentFormat,o,f);return F;};N.createInstance=function(f,l){var F=Object.create(this.prototype),p;if(f instanceof L){l=f;f=undefined;}if(!l){l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();}F.oLocale=l;F.oLocaleData=a.getInstance(l);F.oOriginalFormatOptions=f;if(f){if(f.pattern){p=this.parseNumberPattern(f.pattern);q.each(p,function(s,o){f[s]=o;});}if(f.emptyString!==undefined){}}return F;};N.getLocaleFormatOptions=function(l,t,C){var o={},s;switch(t){case n.PERCENT:s=l.getPercentPattern();break;case n.CURRENCY:s=l.getCurrencyPattern(C);break;default:s=l.getDecimalPattern();}o=this.parseNumberPattern(s);o.plusSign=l.getNumberSymbol("plusSign");o.minusSign=l.getNumberSymbol("minusSign");o.decimalSeparator=l.getNumberSymbol("decimal");o.groupingSeparator=l.getNumberSymbol("group");o.percentSign=l.getNumberSymbol("percentSign");o.pattern=s;switch(t){case n.FLOAT:case n.PERCENT:o.minFractionDigits=0;o.maxFractionDigits=99;break;case n.INTEGER:o.minFractionDigits=0;o.maxFractionDigits=0;o.groupingEnabled=false;break;case n.CURRENCY:o.minFractionDigits=undefined;o.maxFractionDigits=undefined;break;}return o;};N.parseNumberPattern=function(f){var M=0,h=0,j=0,G=false,k=0,l=0,s=f.indexOf(";"),S={Integer:0,Fraction:1},o=S.Integer;if(s!==-1){f=f.substring(0,s);}for(var i=0;i<f.length;i++){var C=f[i];switch(C){case",":if(G){k=l;l=0;}G=true;break;case".":o=S.Fraction;break;case"0":if(o===S.Integer){M++;if(G){l++;}}else{h++;j++;}break;case"#":if(o===S.Integer){if(G){l++;}}else{j++;}break;}}if(!k){k=l;l=0;}return{minIntegerDigits:M,minFractionDigits:h,maxFractionDigits:j,groupingEnabled:G,groupingSize:k,groupingBaseSize:l};};N.prototype.format=function(v,M){if(Array.isArray(v)){M=v[1];v=v[0];}var i="",f="",G="",s="",h="",p="",P=0,l=0,j=0,k=0,o=v<0,D=-1,O=q.extend({},this.oFormatOptions),t=this.oOriginalFormatOptions,u,S,w;if(v===O.emptyString||(isNaN(v)&&isNaN(O.emptyString))){return"";}if(O.decimals!==undefined){O.minFractionDigits=O.decimals;O.maxFractionDigits=O.decimals;}if(O.shortLimit===undefined||Math.abs(v)>=O.shortLimit){w=O.shortRefNumber===undefined?v:O.shortRefNumber;S=g(w,O,this.oLocaleData);if(S&&S.formatString!="0"){v=v/S.magnitude;if(O.shortDecimals!==undefined){O.minFractionDigits=O.shortDecimals;O.maxFractionDigits=O.shortDecimals;}else{if(t.minFractionDigits===undefined&&t.maxFractionDigits===undefined&&t.decimals===undefined&&t.precision===undefined&&t.pattern===undefined){O.precision=2;}if(t.maxFractionDigits===undefined&&t.decimals===undefined){O.maxFractionDigits=99;}}O.roundingMode=N.RoundingMode.HALF_AWAY_FROM_ZERO;}}if(O.precision!==undefined){O.maxFractionDigits=Math.min(O.maxFractionDigits,e(v,O.precision));O.minFractionDigits=Math.min(O.minFractionDigits,O.maxFractionDigits);}if(O.type==n.PERCENT){v=N._shiftDecimalPoint(v,2);}if(O.type==n.CURRENCY){var x=this.oLocaleData.getCurrencyDigits(M);if(O.maxFractionDigits===undefined){O.maxFractionDigits=x;}if(O.minFractionDigits===undefined){O.minFractionDigits=x;}}if(typeof v=="number"){v=c(v,O.maxFractionDigits,O.roundingMode);}if(v==0){o=false;}h=this.convertToDecimal(v);if(h=="NaN"){return h;}if(o){h=h.substr(1);}D=h.indexOf(".");if(D>-1){i=h.substr(0,D);f=h.substr(D+1);}else{i=h;}if(i.length<O.minIntegerDigits){i=q.sap.padLeft(i,"0",O.minIntegerDigits);}else if(i.length>O.maxIntegerDigits){i=q.sap.padLeft("","?",O.maxIntegerDigits);}if(f.length<O.minFractionDigits){f=q.sap.padRight(f,"0",O.minFractionDigits);}else if(f.length>O.maxFractionDigits){f=f.substr(0,O.maxFractionDigits);}l=i.length;if(O.groupingEnabled){j=O.groupingSize;k=O.groupingBaseSize||j;P=Math.max(l-k,0)%j||j;G=i.substr(0,P);while(l-P>=k){G+=O.groupingSeparator;G+=i.substr(P,j);P+=j;}G+=i.substr(P);i=G;}if(o){s=O.minusSign;}s+=i;if(f){s+=O.decimalSeparator+f;}if(S&&S.formatString&&O.showScale){s=S.formatString.replace(S.valueSubString,s);s=s.replace(/'.'/g,".");}if(O.type==n.CURRENCY){p=O.pattern;u=p.split(";");if(u.length===2){p=o?u[1]:u[0];if(o){s=s.substring(1);}}if(!O.currencyCode){M=this.oLocaleData.getCurrencySymbol(M);}s=this._composeCurrencyResult(p,s,M,{showMeasure:O.showMeasure,negative:o,minusSign:O.minusSign});}if(O.type==n.PERCENT){p=O.pattern;s=p.replace(/[0#.,]+/,s);s=s.replace(/%/,O.percentSign);}if(sap.ui.getCore().getConfiguration().getOriginInfo()){s=new String(s);s.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString()};}return s;};N.prototype._composeCurrencyResult=function(p,f,M,o){var s=o.minusSign;p=p.replace(/[0#.,]+/,f);if(o.showMeasure&&M){var P="\u00a4",h={"[:digit:]":/\d/,"[:^S:]":/[^\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/},i=p.indexOf(P),j=i<p.length/2?"after":"before",S=this.oLocaleData.getCurrencySpacing(j),C=(j==="after"?M.charAt(M.length-1):M.charAt(0)),k,l=h[S.currencyMatch],t=h[S.surroundingMatch],I;p=p.replace(P,M);k=(j==="after"?p.charAt(i+M.length):p.charAt(i-1));if(l&&l.test(C)&&t&&t.test(k)){if(j==="after"){I=i+M.length;}else{I=i;}p=p.slice(0,I)+S.insertBetween+p.slice(I);}else if(o.negative&&j==="after"){s="\ufeff"+o.minusSign;}}else{p=p.replace(/\s*\u00a4\s*/,"");}if(o.negative){p=p.replace(/-/,s);}return p;};N.prototype.parse=function(v){var o=this.oFormatOptions,p=d(o.plusSign+o.minusSign),G=d(o.groupingSeparator),D=d(o.decimalSeparator),s="^\\s*(["+p+"]?(?:[0-9"+G+"]+|[0-9"+G+"]*"+D+"[0-9]*)(?:[eE][+-][0-9]+)?)\\s*$",f="^\\s*(["+p+"]?[0-9"+G+"]+)\\s*$",h=new RegExp(G,"g"),i=new RegExp(D,"g"),P=this.oLocaleData.getPercentPattern(),j=this.oLocaleData.getNumberSymbol("percentSign"),k,l,t,u,w,C,x=0,S,E;if(v===""){E=o.emptyString;if(o.parseAsString&&(o.emptyString===0||isNaN(o.emptyString))){E=o.emptyString+"";}if(o.type===n.CURRENCY){return[E,undefined];}else{return E;}}if(P.charAt(0)==="%"){s=s.slice(0,1)+"%?"+s.slice(1);}else if(P.charAt(P.length-1)==="%"){s=s.slice(0,s.length-1)+"%?"+s.slice(s.length-1);}v=v.replace(/\s/g,"");S=b(v,this.oFormatOptions.style,this.oLocaleData);if(S){v=S.number;k=new RegExp(s);}else if(o.isInteger){k=new RegExp(f);}else if(o.type===n.CURRENCY){u="[^\\d\\s+-]*";t="(?:^("+u+")"+s.substring(1,s.length-1)+"$)|(?:^"+s.substring(1,s.length-1)+"("+u+")\\s*$)";k=new RegExp(t);}else{k=new RegExp(s);}if(!k.test(v)){return o.type===n.CURRENCY?null:NaN;}if(o.type===n.CURRENCY){w=k.exec(v);if(w[2]){v=w[2];C=w[1]||undefined;}else{v=w[3];C=w[4]||undefined;}if(C&&!o.showMeasure){return null;}}if(C){C=this.oLocaleData.getCurrencyCodeBySymbol(C)||C;}v=v.replace(h,"");v=v.replace(o.plusSign,"+");v=v.replace(o.minusSign,"-");v=v.replace(/^\+/,"");if(S){v=v.replace(i,".");v=N._shiftDecimalPoint(v,Math.round(Math.log(S.factor)/Math.LN10));}if(o.isInteger){x=o.parseAsString?v:parseInt(v,10);}else{v=v.replace(i,".");if(v.indexOf(j)!==-1){l=true;v=v.replace(j,"");}x=o.parseAsString?v:parseFloat(v);if(l){x=N._shiftDecimalPoint(x,-2);}}if(o.parseAsString){x=N._shiftDecimalPoint(v,0);}return o.type===n.CURRENCY?[x,C]:x;};N.prototype.convertToDecimal=function(v){var V=""+v,f,s,D,F,E,p;if(V.indexOf("e")==-1&&V.indexOf("E")==-1){return V;}var h=V.match(/^([+-]?)((\d+)(?:\.(\d+))?)[eE]([+-]?\d+)$/);f=h[1]=="-";s=h[2].replace(/\./g,"");D=h[3]?h[3].length:0;F=h[4]?h[4].length:0;E=parseInt(h[5],10);if(E>0){if(E<F){p=D+E;V=s.substr(0,p)+"."+s.substr(p);}else{V=s;E-=F;for(var i=0;i<E;i++){V+="0";}}}else{if(-E<D){p=D+E;V=s.substr(0,p)+"."+s.substr(p);}else{V=s;E+=D;for(var i=0;i>E;i--){V="0"+V;}V="0."+V;}}if(f){V="-"+V;}return V;};N.prototype.getScale=function(){if((this.oFormatOptions.style!=="short"&&this.oFormatOptions.style!=="long")||this.oFormatOptions.shortRefNumber===undefined){return;}var s=g(this.oFormatOptions.shortRefNumber,this.oFormatOptions,this.oLocaleData),S;if(s&&s.formatString){S=s.formatString.replace(r,"").replace(/'.'/g,".").trim();if(S){return S;}}};N._shiftDecimalPoint=function(v,s){if(typeof s!=="number"){return NaN;}var E=v.toString().toLowerCase().split("e");if(typeof v==="number"){s=E[1]?(+E[1]+s):s;return+(E[0]+"e"+s);}else if(typeof v==="string"){if(parseInt(v,10)===0&&s>=0){return v;}v=E[0];var D=v.indexOf("."),A,i,f;if(D===-1){v=v+".";D=v.length-1;}if(E[1]){D+=(+E[1]);}A=D+s;if(A<=0){v=q.sap.padLeft(v,'0',v.length-A+1);A=1;}else if(A>=v.length-1){v=q.sap.padRight(v,'0',A+1);A=v.length-1;}v=v.replace(".","");i=v.substring(0,A);f=v.substring(A);i=i.replace(/^(-?)0+(\d)/,"$1$2");return i+(f?("."+f):"");}else{return null;}};function g(v,o,l){var s,k,S=o.style,p=o.precision,D=o.shortDecimals||o.maxFractionDigits,P=p!==undefined;if(!P){p=2;}if(S!="short"&&S!="long"){return s;}for(var i=0;i<14;i++){k=Math.pow(10,i);if(c(Math.abs(v)/k,p-1)<10){break;}}var f=v/k,D=P?e(f,p):D,h=c(Math.abs(f),D);var j="other";if(h==0){j="zero";}else if(h==1){j="one";}else if(h==2){j="two";}else if(h>2&&h<=5){j="few";}else if(h>5&&h<=10){j="many";}var C=l.getDecimalFormat(S,k.toString(),j);if(!C||C=="0"){return s;}else{s={};s.formatString=C;var t=C.match(r);if(t){s.valueSubString=t[0];var u=s.valueSubString.indexOf(".");if(u==-1){s.decimals=0;s.magnitude=k*Math.pow(10,1-s.valueSubString.length);}else{s.decimals=s.valueSubString.length-u-1;s.magnitude=k*Math.pow(10,1-u);}}else{s.magnitude=1;}}return s;}function b(v,s,l){if(s!="short"&&s!="long"){return;}var f,F=1,k=10,p=["zero","one","two","few","many","other"],C,G=function(P){C=l.getDecimalFormat(s,k.toString(),P);if(C){C=C.replace(/[\s\u00a0]/g,"");C=C.replace(/'.'/g,".");var h=C.match(r);if(h){var V=h[0];var u=C.replace(V,"");if(!u){return;}var i=v.indexOf(u);if(i>=0){f=v.replace(u,"");F=k;return true;}}}};while(k<1e14){if(p.some(G)){break;}k=k*10;}if(!f){return;}return{number:f,factor:F};}function c(v,M,s){if(typeof v!=="number"){return NaN;}s=s||N.RoundingMode.HALF_AWAY_FROM_ZERO;M=parseInt(M,10);if(typeof s==="function"){v=s(v,M);}else{if(!M){return m[s](v);}v=N._shiftDecimalPoint(m[s](N._shiftDecimalPoint(v,M)),-M);}return v;}function d(s){return s.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");}function e(v,p){var i=Math.floor(Math.log(Math.abs(v))/Math.LN10);return Math.max(0,p-i-1);}return N;});
