(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1371:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var d,o=(d=i(1453))&&d.__esModule?d:{default:d};e.default=o.default,t.exports=e.default},1452:function(t,e,i){},1453:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var d=p(i(153)),o=p(i(18)),n=p(i(6)),r=p(i(11)),u=p(i(5)),s=p(i(7)),l=i(1),a=p(l);function p(t){return t&&t.__esModule?t:{default:t}}i(1452);var f=function(t){function e(t){(0,n.default)(this,e);var i=(0,u.default)(this,(e.__proto__||(0,o.default)(e)).call(this,t));return i.editor=null,i}return(0,s.default)(e,t),(0,r.default)(e,[{key:"componentDidMount",value:function(){this.editor=UE.getEditor("editor"),this.editor.ready(function(){var t=this.props.itemTmplPublishVo&&this.props.itemTmplPublishVo.describeUrl||"";this.props.editGoods&&this.editor.setContent(t)}.bind(this)),this.editor.addListener("contentChange",function(){var t=JSON.parse((0,d.default)(this.props.itemTmplPublishVo));t.describeUrl=this.editor.getContent(),this.props.updateItemTmplAction(t)}.bind(this))}},{key:"render",value:function(){return a.default.createElement("div",null,a.default.createElement("p",{className:"mt10 mb10 descTips"},"提示：建议上传的图片大小限制为3M，尺寸宽度为960，否则系统会自动压缩和宽度调整可能会使图片失真"),a.default.createElement("div",{id:"editor",style:{maxWidth:"960px",width:"100%",height:"450px",paddingBottom:"24px"}}))}}]),e}(l.Component);e.default=f,t.exports=e.default}}]);
//# sourceMappingURL=16-32ea5e103587f91c15d8.js.map