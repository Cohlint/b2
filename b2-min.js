!function(e,t){if("function"==typeof define&&define.amd)define(["backbone","underscore","jquery","exports"],function(n,r,i,o){e.B2=t(e,o,n,r,i)});else if("undefined"!=typeof exports){var n=require("backbone"),r=require("underscore");t(e,exports,n,r)}else e.B2=t(e,{},e.Backbone,e._,e.jQuery||e.Zepto||e.ender||e.$)}(this,function(e,t,n,r,i){var o=e.B2;t.VERSION="0.1.11",t.noConflict=function(){return e.B2=o,this};var s={};try{s=window.localStorage}catch(e){}t.localStorage=s,t.log=function(){if(t.debug&&window.console&&window.console.log)return console.log.apply(window.console,arguments)},r.extend(t,n),t.rootViews={},t.getComponentByUniqueName=function(e){function n(e,t){var i;return r.each(e,function(e){if(i)return!1;i=e._uuid+"_"+e._componentName===t?e:n(e._components,t)}),i}return n(t.rootViews,e)},t.View=n.View.extend({template:function(){return""},appEvents:{},broadcastEvents:{},broadcast:function(){var e=[].slice.apply(arguments);e.unshift("__broadcast__"),this.trigger.apply(this,e)},registerComponent:function(e,n,o,s){if(this.isRemoved)return n.remove(),t.log("i am already removed, dont register components to me.",this._uuid,this._componentName),n;var a;if(this._parentView||(t.rootViews[this.cid]=this),this._components=this._components||{},this._components.hasOwnProperty(e)){var p=this._components[e];p.trigger&&p.trigger("beforeRemove"),this.stopListening(p,"all"),p.remove()}this._components[e]=n,n._parentView=this,t.rootViews[n.cid]&&delete t.rootViews[n.cid],n._componentName=e,n._uuid=r.uniqueId(),n.$el.attr("data-component-unique-name",n._uuid+"_"+e);var c=/^(\S+)\s*(\S+)$/;for(var l in this.appEvents)if(this.appEvents.hasOwnProperty(l)){var d=this.appEvents[l],h=l.match(c),u=h[1],f=h[2];if(h&&f){var v=/\/(.*?)\//.exec(f),m=v&&v[1];m&&(f=new RegExp(m.replace(/\\/g,"\\\\")))}if(f){var _=!1;if(r.isRegExp(f)&&f.test(e)?_=!0:f==e&&(_=!0),_){var y=u.split(/,/),g=this[d];for(a=0;a<y.length;a++)"all"!==y[a]&&this.listenTo(n,y[a],g)}}}return this.listenTo(n,"all",function(e){"__broadcast__"!==e&&(this.appEvents.hasOwnProperty("all")?this[this.appEvents.all].apply(this,[arguments[0],n].concat(r.toArray(arguments).slice(1))):n._events&&n._events[e]||this.trigger.apply(this,arguments))}),n.listenTo(this,"__broadcast__",function(){var e=[].slice.apply(arguments),t=e.shift();if(n.broadcastEvents.hasOwnProperty(t)){var i=n.broadcastEvents[t];(r.isString(i)?n[i]:i).apply(n,e)}else n.broadcast.apply(n,arguments)}),o&&(r.isString(o)?this.$(o).append(n.el):i(o).append(n.el),!0!==s&&n.render()),n},getComponent:function(e){return this._components?this._components[e]:null},getComponents:function(){return this._components||{}},freeChildren:function(e){r.each(this._components,function(t,n){(!e||(r.isRegExp(e)?e.test(n):e===n||e===t))&&(this.stopListening(t,"all"),t.remove(),this._components[n]&&(delete this._components[n],delete t._parentView))},this)},_addFieldToFormParams:function(e,t,n){if(r.isObject(n)&&!r.isArray(n)){var i=n[e];if(void 0===i)n[e]=t;else if(r.isArray(i))r.isArray(i)&&i.push(t);else{var o=i;n[e]=[o],n[e].push(t)}}else r.isArray(n)&&n.push({name:e,value:t})},_parseSerializeOpts:function(e){var t={},n=(e||"").split(";"),o={false:!1,true:!0};return r.each(n,function(e){e=e.split(":");var n=i.trim(e[0]),s=i.trim(e[1]);t[n]=r.isUndefined(o[s])?s:o[s]}),r.defaults(t,{trim:!0})},serializeForm:function(e,t,n,o){var s=this;e=e||this.el;var a=i(e).find("input, select, textarea").filter(function(){var n=!1,r=i(this).closest("."+o);return 0===r.length?n=!0:i.contains(e,r[0])||(n=!0),n&&this.name&&-1===this.name.indexOf(t||"ignore")}),p={};return n&&(p=[]),a.each(function(){var e=i(this),t=e.attr("name"),n=s._parseSerializeOpts(e.attr("data-serialize-opts")),o=e.val();o=n.trim?i.trim(o):o;var a=e.attr("value2"),c=!0,l=e.attr("data-inverse-value"),d=e.data("dataTypeToParse");switch(e.prop("type")){case"radio":e.prop("checked")?t=e.attr("name"):c=!1;break;case"checkbox":e.prop("checked")?null!=o&&"on"!=o||(o=!0):o=null!=a&&a,l&&(o=!o)}if(r.isString(d))switch(d.toLowerCase()){case"int":var h=parseInt(o,10);o=isNaN(h)?o:h;break;case"float":var u=parseFloat(o);o=isNaN(u)?o:u}c&&s._addFieldToFormParams(t,o,p)}),p},serializeArray:function(e,t){return this.serializeForm(e,t,!0)},getParentView:function(){return this._parentView},remove:function(){this.freeChildren(),this.trigger("beforeRemove");var e=this._parentView;e&&(e.stopListening(this),e._components&&delete e._components[this._componentName],delete this._parentView),t.rootViews[this.cid]&&delete t.rootViews[this.cid],n.View.prototype.remove.apply(this,arguments),this.isRemoved=!0},render:function(){this.$el.html(this.template())}}),t.Model=n.Model.extend({}),t.Collection=n.Collection.extend({}),t.Router=n.Router.extend({}),t.History=n.History.extend({});t.Model.extend=t.Collection.extend=t.Router.extend=t.View.extend=t.History.extend=function(e,t,n){n=n||[];var i,o=this,s=o.prototype;i=e&&r.has(e,"constructor")?e.constructor:function(){return o.apply(this,arguments)},r.extend(i,o,t);var a=function(){this.constructor=i};a.prototype=o.prototype;var p=i.prototype=new a,c=/xyz/.test(function(){return"xyz"})?/\b_super\b/:/.*/;for(var l in e)e.hasOwnProperty(l)&&(p[l]="function"==typeof e[l]&&"function"==typeof s[l]&&(c.test(e[l])||n.indexOf(l)>-1)?function(e,t){return function(){var n=this._super;this._super=s[e];var r=t.apply(this,arguments);return this._super=n,r}}(l,e[l]):e[l]);return i.__super__=o.prototype,i};var a=t.View.extend;t.View.extend=function(e,n){if(e.render){var i=e.render;e.render=function(){if(this.isRemoved)return t.log("i am already removed, dont render me",this._uuid,this._componentName),this;this.onRenderBegin&&this.onRenderBegin(),this.freeChildren&&this.freeChildren();var e=i.apply(this,arguments);return this.onRenderEnd&&this.onRenderEnd(),e}}var o=a.call(this,e,n,["render"]);return o.prototype.events=r.extend({},this.prototype.events,e.events),o.prototype.appEvents=r.extend({},this.prototype.appEvents,e.appEvents),o.prototype.broadcastEvents=r.extend({},this.prototype.broadcastEvents,e.broadcastEvents),o}});
//# sourceMappingURL=b2-min.js.map