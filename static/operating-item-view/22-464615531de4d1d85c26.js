(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1249:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r=(o=n(1332))&&o.__esModule?o:{default:o};t.default=r.default,e.exports=t.default},1331:function(e,t,n){},1332:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=d(n(947)),r=d(n(153)),a=d(n(18)),l=d(n(6)),u=d(n(11)),i=d(n(5)),s=d(n(7)),c=d(n(948));n(950),n(949);var f=n(1),p=d(f);function d(e){return e&&e.__esModule?e:{default:e}}n(1331);var h=c.default.Group,v=function(e){function t(e){(0,l.default)(this,t);var n=(0,i.default)(this,(t.__proto__||(0,a.default)(t)).call(this,e));return n.radioChange=function(e){console.log(e.target.value);var t=JSON.parse((0,r.default)(n.props.itemTmplPublishVo));t.deliveryInfoVo.deliveryType=e.target.value,n.props.updateItemTmplAction(t)},n.onChange=function(e){console.log(e.target.checked);var t=JSON.parse((0,r.default)(n.props.itemTmplPublishVo));e.target.checked?t.deliveryInfoVo.homeDelivery=1:t.deliveryInfoVo.homeDelivery=0,n.props.updateItemTmplAction(t)},n}return(0,s.default)(t,e),(0,u.default)(t,[{key:"componentWillReceiveProps",value:function(e){console.log(e)}},{key:"render",value:function(){return p.default.createElement("div",null,p.default.createElement("h3",{className:"h3-title"},"运费信息"),p.default.createElement("div",null,p.default.createElement(h,{defaultValue:1,onChange:this.radioChange},p.default.createElement(c.default,{className:"otherMt202",value:1},"商品价格已包含运费",p.default.createElement("span",{className:"smallColor"},"（选择此项时请记得将运费分摊至商品单价里)")),p.default.createElement("br",null),p.default.createElement(c.default,{className:"otherMt202",value:2},"选择合适的物流公司运输，运费到付",p.default.createElement("span",{className:"smallColor"},"（不需要在产品单价里加运费，买家根据实际费用支付）")),p.default.createElement("br",null)),p.default.createElement("br",null),p.default.createElement(o.default,{defaultValue:!1,className:"otherMt202",onChange:this.onChange},"同城可送货上门")))}}]),t}(f.Component);t.default=v,e.exports=t.default},776:function(e,t,n){"use strict";var o;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(1)),u=f(n(0)),i=f(n(9)),s=f(n(355)),c=f(n(145));function f(e){return e&&e.__esModule?e:{default:e}}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.focus=function(){n.rcCheckbox.focus()},n.blur=function(){n.rcCheckbox.blur()},n.saveCheckbox=function(e){n.rcCheckbox=e},n.rcCheckbox=void 0,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),a(t,[{key:"shouldComponentUpdate",value:function(e,t,n){return!(0,c.default)(this.props,e)||!(0,c.default)(this.state,t)||!(0,c.default)(this.context.checkboxGroup,n.checkboxGroup)}},{key:"render",value:function(){var e,t=this.props,n=this.context,o=t.prefixCls,a=t.className,u=t.children,c=t.indeterminate,f=t.style,d=t.onMouseEnter,h=t.onMouseLeave,v=t.ghost,b=function(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(t,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave","ghost"]),y=n.checkboxGroup,m=r({},b);y&&(m.onChange=function(){return y.toggleOption({label:u,value:t.value})},m.checked=-1!==y.value.indexOf(t.value),m.disabled=t.disabled||y.disabled);var g=(0,i.default)(a,p({},o+"-wrapper",!0)),O=(0,i.default)((p(e={},o+"-ghost",v),p(e,o+"-indeterminate",c),e));return l.createElement("label",{className:g,style:f,onMouseEnter:d,onMouseLeave:h},l.createElement(s.default,r({},m,{prefixCls:o,className:O,ref:this.saveCheckbox})),void 0!==u?l.createElement("span",null,u):null)}}]),t}();d.defaultProps={prefixCls:"jc-checkbox",indeterminate:!1,className:"",ghost:!1},d.propTypes=(p(o={prefixCls:u.default.string,indeterminate:u.default.bool,autoFocus:u.default.bool,checked:u.default.bool},"indeterminate",u.default.bool),p(o,"onChange",u.default.func),p(o,"style",u.default.object),p(o,"className",u.default.string),p(o,"ghost",u.default.bool),o),d.contextTypes={checkboxGroup:u.default.any},t.default=d},947:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(n(776)),r=a(n(955));function a(e){return e&&e.__esModule?e:{default:e}}o.default.Group=r.default,t.default=o.default},950:function(e,t,n){"use strict";n(42),n(954)},954:function(e,t,n){},955:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(1)),a=s(n(0)),l=s(n(9)),u=s(n(145)),i=s(n(776));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.toggleOption=function(e){var t=n.state.value.indexOf(e.value),o=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(n.state.value));-1===t?o.push(e.value):o.splice(t,1),"value"in n.props||n.setState({value:o});var r=n.props.onChange;r&&r(o)},n.state={value:e.value||e.defaultValue||[]},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"getChildContext",value:function(){return{checkboxGroup:{ghost:this.props.ghost,toggleOption:this.toggleOption,value:this.state.value,disabled:this.props.disabled}}}},{key:"componentWillReceiveProps",value:function(e){"value"in e&&this.setState({value:e.value||[]})}},{key:"shouldComponentUpdate",value:function(e,t){return!(0,u.default)(this.props,e)||!(0,u.default)(this.state,t)}},{key:"getOptions",value:function(){return this.props.options.map(function(e){return"string"==typeof e?{label:e,value:e}:e})}},{key:"render",value:function(){var e=this,t=this.props,n=t.prefixCls,o=t.className,a=t.style,u=t.options,s=t.ghost,c=this.props.children;u&&u.length>0&&(c=this.getOptions().map(function(t){return r.createElement(i.default,{ghost:s,key:t.value,disabled:"disabled"in t?t.disabled:e.props.disabled,value:t.value,checked:-1!==e.state.value.indexOf(t.value),onChange:function(){return e.toggleOption(t)},className:n+"-item"},t.label)}));var f=(0,l.default)(n,o);return r.createElement("div",{className:f,style:a},c)}}]),t}();c.defaultProps={options:[],prefixCls:"jc-checkbox-group",ghost:!1},c.propTypes={prefixCls:a.default.string,defaultValue:a.default.array,value:a.default.array,options:a.default.array,onChange:a.default.func,ghost:a.default.bool},c.childContextTypes={checkboxGroup:a.default.any},t.default=c}}]);
//# sourceMappingURL=22-464615531de4d1d85c26.js.map