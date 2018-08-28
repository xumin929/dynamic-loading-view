/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布-规格参数
 ****************************************************************/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Menu, Icon, Dropdown, Form, Input, Select, Checkbox } from 'jdcloudui';
import { uploadPrams, findCategory} from './redux';
const Option = Select.Option;
import styles from './style/GoodsBasic.css';
import './style/GoodsBasic.css';

@Form.create()
@connect(
  state => ({
  	goodsRlease:state.goodsRlease,
  	goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({uploadPrams, findCategory}, dispatch)
)
export default class BasicInfomation extends Component{
	constructor(props, context) {
	  super(props, context);
	  this.saledata = [];
	  this.first = true;
	  this.state={
	  	saledata: [],
	  	divs: [],
	  	checks: []
	  };
	  this.itemPulishVO = [];
	  this.specData = []; //规格参数拿到的数据
	  this.firstLoad = true;
	  this.drops = null;
	  this.divs = [];
	  this.chks = [];
	  this.init = true;
	  this.checks = [];//当前选中的元素
	  this.initEditAttributes = true;
	  this.initInputValue = true;
	  this.initChecks = [];
	  this.initLoadAttrlist = true;
	  this.detailStatus = true;
	}
	handleSelectSize(value) {
	}
	handleSelectColor(value) {
	}
	handleSelectCapacity(value) {
	}
	handleSelectSpec(value) {
	}
	optionData(data){
		let optiondata = '';
		 data.map((item, index) => {
			optiondata += (<Option><Checkbox id = {item2.attrValueId} parentId = {item2.attrId} onChange={::this.changeAttr}>{item.attrValueName}</Checkbox></Option>);
		});
		return optiondata;
	}
	initData(data){
		let listdata;
		let divs;
		data.map((item, index) => {
			 listdata = this.optionData(item.platformCategoryAttributeValues);
			 item.platformCategoryAttributeValues.map((item,index) => {
			 	if(item.ifchecked == true){
			 		divs += '<span>'+item.attrValueName+'</span>';
			 	}else{}
			 });
			 this.saleString += '<div style = {{overflow: "hidden"}}><div className = '+styles.ov+'><label htmlFor="" class = '+styles.la2+'>'+item.attrName+':</label><Select class = '+styles.sel+' placeholder="请选择" onChange = {this.handleSelectSize}>'+listdata+'</Select><Input class= '+styles.inp+' placeholder="输入属性描述" size="default" /></div><div class='+styles.dis+'>' + divs + '</div></div>';
		});
		this.setState({
			saleString: this.saleString
		});
		console.log(this.props.goodsRlease.saleInfoAfter,'this.props.goodsRlease.saleInfoAfter.lengththis.props.goodsRlease.saleInfoAfter.lengththis.props.goodsRlease.saleInfoAfter.length');
		console.log(divs,'divsdivsdivsdivsdivsdivs');
	}
	componentDidMount(){
		if(!this.props.editGoods){
			this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
		}else{}
	}
	changeAttr(e){
		this.specData.map((item,index) => { //重新渲染拿过来的数据
			if(item.attrId == e.target.parentId){
				item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.attrValueId == e.target.id){
						item2.ifchecked = e.target.checked;
						if(!e.target.checked){
							this.delete(item2.attrValueId, item2.attrId);
						}else{}
					}else{}
				});
			}
		});
		this.setState({
			saledata: this.specData
		});
		let checkedString = '';
		this.specData.map((item,index) => {
			item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.ifchecked === true){
						checkedString += (item2.attrId+':'+item2.attrValueId+':'+item.text+';');
					}else{}
				});
		});
		this.itemPulishVO.specAttributes = checkedString;
		this.props.uploadPrams(this.itemPulishVO);
		this.init = false;

	}
	delete(id, parentId){
		this.specData.map((item,index) => {
			if(item.attrId == parentId){
				item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.attrValueId == id){
						item2.ifchecked = false;
					}else{}
				});
			}
		});
		this.checks.map((item, index) => {
			if(item[parentId] != undefined){
				item[parentId].map((item2, index2) => {
					if(item2 == id){
						this.checks[index][parentId].splice(index2, 1);
					}else{}
				});
			}else{}
		});
		this.setState({
			saledata: this.specData
		});
		let checkedString = '';
		this.specData.map((item,index) => {
			item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.ifchecked === true){
						checkedString += (item2.attrId+':'+item2.attrValueId+':'+item.text+';');
					}else{}
				});
		});
		this.itemPulishVO.specAttributes = checkedString;
		this.props.uploadPrams(this.itemPulishVO);
		this.init = false;
	}
	inputChange(attrId,e){
		let desvalue = ' ';
		if(e.target && e.target.value){
			desvalue = e.target.value;
		}else{
			desvalue = e;
		}
		this.specData.map((item, index) => {
			if(item.attrId == attrId){
				item.text = desvalue;
			}else{}
		});
		let checkedString = '';
		this.specData.map((item,index) => {
			item.platformCategoryAttributeValues.map((item2,index2) => {
					if(item2.ifchecked === true){
						checkedString += (item2.attrId+':'+item2.attrValueId+':'+item.text+';');
					}else{}
				});
		});
		this.itemPulishVO.specAttributes = checkedString;
		this.props.uploadPrams(this.itemPulishVO);
	}
	changeAttrList(checkStatus){
		if(this.props.checkesArray.length > 0){
			this.checks = this.props.checkesArray;
		}else{}
		if(checkStatus.ifcheckd){
			this.checks.map((item,index)=>{
				if(item[checkStatus.parentId]){
					if(item[checkStatus.parentId].length> 0){
						let array = item[checkStatus.parentId];
						if(array.indexOf(checkStatus.val) == -1){
							item[checkStatus.parentId].push(checkStatus.val);
							return;
						}else{
						}

					}else{
						item[checkStatus.parentId].push(checkStatus.val);
					}
				}else{}
			});
		}else{
			this.checks.map((item,index)=>{
				if(item[checkStatus.parentId]){
					if(item[checkStatus.parentId].length> 0){
						let array = item[checkStatus.parentId];
						if(array.indexOf(checkStatus.val) == -1){
							return;
						}else{
							item[checkStatus.parentId].splice(array.indexOf(checkStatus.val), 1);
							if(this.specData && this.specData.length > 0){
								this.specData.map((specitem, index) => {
									if(specitem.attrId == checkStatus.parentId){
										if(specitem.platformCategoryAttributeValues && specitem.platformCategoryAttributeValues.length > 0){
											specitem.platformCategoryAttributeValues.map((platItem,platIndex) => {
												if(platItem.attrValueId == checkStatus.val){
													platItem.ifchecked = false;
												}else{}
											});
										}else{}
									}else{}
								});
							}else{}
						}
					}else{
					}
				}else{}
			});
		}
		this.initLoadAttrlist = false;
		this.props.setChecksArray(this.checks);
		if(this.specData && this.specData.length > 0 && this.saledata && this.saledata.length > 0){
				this.specData.map((item,index) => { //对拿到的规格参数数据遍历
					this.divs = []; //当前一共有多少DIV
					this.chks = []; //将初始值设置为空
					item.platformCategoryAttributeValues.map((item2,index2)=>{ //对属性值进行遍历
						let ifchecked = false;
						if(item2.ifchecked){
		    				this.divs.push(<span id = {item2.attrValueId} parentId = {item2.attrId} className={styles.span}><span className={styles.iconSpace}>{item2.attrValueName}</span><Icon className={styles.iconColor} id = {item2.attrValueId} parentId = {item2.attrId} type="close" onClick = {() => {this.delete(item2.attrValueId, item2.attrId)}}/></span>);
		    				ifchecked = true;
		    			}else if(true){
		    				this.checks.map((saleitem, index4)=>{ //对前面选中的销售表格进行遍历
								let keys = [];
								for(var key in saleitem){
							    		keys.push(key);
									 }
								saleitem[keys[0]].map((ssitem, index3) => { //遍历里面每个被选中的原素
									   if(item2.attrValueId == ssitem && item.attrId == keys[0]){
						    				this.divs.push(<span id = {item2.attrValueId} parentId = {item2.attrId} className = {styles.span}><span className={styles.iconSpace}>{item2.attrValueName}</span><Icon className={styles.iconColor} id = {item2.attrValueId} parentId = {item2.attrId} type="close" onClick = {() => {this.delete(item2.attrValueId, item2.attrId)}}/></span>);
						    				ifchecked = true;
						    				(this.specData[index].platformCategoryAttributeValues)[index2].ifchecked = true;
						    				return;
						    			}else {

						    			}
								});

							});
		    			}else{}
						this.chks.push(<Menu.Item><div><Checkbox id = {item2.attrValueId} parentId = {item2.attrId} checked = {ifchecked || item2.ifchecked} onChange={::this.changeAttr} />&nbsp;&nbsp;{item2.attrValueName}</div></Menu.Item>);
			    	});
		    		const menu = (
				      <Menu>
				        {this.chks}
				      </Menu>
				    );

				    if(this.props.editGoods && this.initInputValue){
				    	let otherStatus = false;
				    	let editAttributesData2 = [];
				    	if(this.props.goodsEdit && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.specAttributesCheck){
				    		editAttributesData2 = this.props.goodsEdit.editGoods.specAttributesCheck;
				    	}else{}
				    	if(editAttributesData2 && editAttributesData2.length > 0){
					    	editAttributesData2.map((attrbutesItem, attrbutesIndex) => {
					    		if((item.attrId == attrbutesItem.key) && !otherStatus){
					    			let value = null;
					    			if(attrbutesItem.descript == 'undefined' || !attrbutesItem.descript){
					    				value = null;
					    			}else{
					    				value = attrbutesItem.descript;
					    			}
					    			this.drops.push(<div><div className = {styles.ov}><label htmlFor="" className = {styles.la2}>{item.attrName} :</label><Dropdown.Button overlay={menu} className = {styles.sel}><a className="jc-dropdown-link" href="#">请选择</a></Dropdown.Button><Input className= {styles.inp} defaultValue = {value} onBlur = {(e)=>{this.inputChange(item.attrId,e);}} placeholder="输入属性描述" size="default" /></div><div className={styles.dis}>{this.divs}</div></div>);
					    			otherStatus = true;
					    			return;
					    		}else{
					    		}
					    	});
					    }else{}
				    	if(!otherStatus){
				    		this.drops.push(<div><div className = {styles.ov}><label htmlFor="" className = {styles.la2}>{item.attrName} :</label><Dropdown.Button overlay={menu} className = {styles.sel}><a className="jc-dropdown-link" href="#">请选择</a></Dropdown.Button><Input className= {styles.inp} onBlur = {(e)=>{this.inputChange(item.attrId,e);}} placeholder="输入属性描述" size="default" /></div><div className={styles.dis}>{this.divs}</div></div>);
				    	}else{}
			        }else{
			        	this.drops.push(<div><div className = {styles.ov}><label htmlFor="" className = {styles.la2}>{item.attrName} :</label><Dropdown.Button overlay={menu} className = {styles.sel}><a className="jc-dropdown-link" href="#">请选择</a></Dropdown.Button><Input className= {styles.inp} onBlur = {(e)=>{this.inputChange(item.attrId,e);}} placeholder="输入属性描述" size="default" /></div><div className={styles.dis}>{this.divs}</div></div>);
			        }
			    });
			    this.initInputValue = false;
	    }else{}
	    this.setState({
	    	drops: this.drops
	    });
	}
	detail(){
		this.specData.map((item,index) => {
						item.platformCategoryAttributeValues.map((item2,index2) => {
								if(this.itemPulishVO.specAttributesCheck && this.itemPulishVO.specAttributesCheck.length > 0){
									this.itemPulishVO.specAttributesCheck.map((specitem, specindex) => {
										if(specitem.values[0] == item2.attrValueId && specitem.key == item2.attrId){
										let text = '';
											if(specitem.descript == 'undefined' && !specitem.descript){
												text = ' ';
											}else{
												text = specitem.descript;
											}
											this.inputChange(item2.attrId,text)
										}else{}
									});
								}else{}

							});
					});
		this.detailStatus = false;
	}
    render() {
    	//this.props.checksStatus && (this.initLoadAttrlist = true )
    	/*if(this.props.checkesArray != this.checks){
    		this.initLoadAttrlist = true;
    	}else{}*/
    	if(this.props.editGoods){
	    	if(this.props.goodsEdit.editGoods
	    		&& this.props.goodsEdit.editGoods.itemName
	    		&& this.firstLoad
	    		&& this.specData
	    		&& this.specData.length > 0){
			   		this.itemPulishVO = this.props.goodsEdit.editGoods;
			   		this.props.uploadPrams(this.itemPulishVO);
			   		this.firstLoad = false;
			   		if(this.detailStatus){
			   			this.detail();
			   		}else{}

			}else{
			}
		}else{
			this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
		}
		/*if(this.props.goodsRlease.categoryData.categoryloaded){
    				this.specData = this.props.goodsRlease.categoryData.data;
    			}else{}*/
    	if(this.init){
    		this.saledata = JSON.parse(JSON.stringify(this.props.goodsRlease.saleData)); // 拿到的前面的销售属性的数据
    		if(this.props.goodsRlease && this.props.goodsRlease.categoryData && this.props.goodsRlease.categoryData.data){
    			if(this.detailStatus){
    	    		this.specData = this.props.goodsRlease.categoryData.data;
    	    	}else{} //规格参数的属
    	    }else{}
    		if(this.saledata && this.saledata.length > 0){
				this.checks = [];
				let editAttributesData = [];
		    	if(this.props.goodsEdit && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.specAttributesCheck){
		    		editAttributesData = this.props.goodsEdit.editGoods.specAttributesCheck;
		    	}else{}
				//let editAttributesData = this.props.goodsEdit.editGoods.specAttributesCheck;
				this.saledata.map((item, index) => {
					this.checks.push({
						[item.attrId]: []
					});
					item.platformCategoryAttributeValues.map((item2, index2)=>{ //遍历每个属性值是否否合
						let ifhas = true;
						if(this.props.editGoods){
							if(editAttributesData.length > 0){
								editAttributesData.map((arrbuteItem, attbuteIndex) => {
										if(arrbuteItem.key == item.attrId && arrbuteItem.values[0] == item2.attrValueId && (!item2.salechecked)){
											this.checks[index][item.attrId].push(item2.attrValueId);
											ifhas = false;
											return;
										}else{
										}
								});
								if(ifhas){
									if(item2.ifchecked){
										this.checks[index][item.attrId].push(item2.attrValueId);
									}else{}
								}else{}
							}else{
								if(item2.ifchecked){
									this.checks[index][item.attrId].push(item2.attrValueId);
								}else{}
							}
						}else{
							if(item2.ifchecked){
								this.checks[index][item.attrId].push(item2.attrValueId);
							}else{}
						}
					});
				});
				this.initChecks = this.checks;
			}else{}
			this.init = false;
    	}else{}
		//获取当前被选中的属性值
		this.drops = [];
		if(this.specData && this.specData.length > 0 && this.saledata && this.saledata.length > 0){
			if(this.props.goodsEdit.editGoods
	    		&& this.props.goodsEdit.editGoods.itemName
	    		&& this.firstLoad
	    		&& this.specData
	    		&& this.specData.length > 0
	    		&& this.detailStatus){
				this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
		   		this.detail();
				}else{}
			if(this.props.checkesArray.length > 0){
				this.checks = this.props.checkesArray;
			}else{}
				this.specData.map((item,index) => { //对拿到的规格参数数据遍历
					this.divs = []; //当前一共有多少DIV
					this.chks = []; //将初始值设置为空
					item.platformCategoryAttributeValues.map((item2,index2)=>{ //对属性值进行遍历
						let ifchecked = false;
						if(item2.ifchecked){
		    				this.divs.push(<span id = {item2.attrValueId} parentId = {item2.attrId} className = {styles.span}><span className={styles.iconSpace}>{item2.attrValueName}</span><Icon className={styles.iconColor} id = {item2.attrValueId} parentId = {item2.attrId} type="close" onClick = {() => {this.delete(item2.attrValueId, item2.attrId)}}/></span>);
		    				ifchecked = true;
		    			}else if(true){
		    				this.checks.map((saleitem, index4)=>{ //对前面选中的销售表格进行遍历
								let keys = [];
								for(var key in saleitem){
							    		keys.push(key);
									 }
								saleitem[keys[0]].map((ssitem, index3) => { //遍历里面每个被选中的原素
									   if(item2.attrValueId == ssitem && item.attrId == keys[0]){
						    				this.divs.push(<span id = {item2.attrValueId} parentId = {item2.attrId} className = {styles.span}><span className={styles.iconSpace}>{item2.attrValueName}</span><Icon className={styles.iconColor} id = {item2.attrValueId} parentId = {item2.attrId} type="close" onClick = {() => {this.delete(item2.attrValueId, item2.attrId)}} /></span>);
						    				ifchecked = true;
						    				(this.specData[index].platformCategoryAttributeValues)[index2].ifchecked = true;
						    				return;
						    			}else {

						    			}
								});

							});
		    			}else{}
						this.chks.push(<Menu.Item><div><Checkbox id = {item2.attrValueId} parentId = {item2.attrId} checked = {ifchecked || item2.ifchecked} onChange={::this.changeAttr} />&nbsp;&nbsp;{item2.attrValueName}</div></Menu.Item>);
			    	});
		    		const menu = (
				      <Menu>
				        {this.chks}
				      </Menu>
				    );
				    if(this.props.editGoods && this.initInputValue){
				    	let editAttributesData2 = [];
				    	if(this.props.goodsEdit && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.specAttributesCheck){
				    		editAttributesData2 = this.props.goodsEdit.editGoods.specAttributesCheck;
				    	}else{}
				    	//let editAttributesData2 = this.props.goodsEdit.editGoods.specAttributesCheck;
				    	let otherStatus2 = false;
				    	editAttributesData2.map((attrbutesItem, attrbutesIndex) => {
				    		if((item.attrId == attrbutesItem.key) && !otherStatus2){
				    			let value = null;
				    			if(attrbutesItem.descript == 'undefined' || !attrbutesItem.descript){
				    				value = null;
				    			}else{
				    				value = attrbutesItem.descript;
				    			}
				    			this.drops.push(<div><div className = {styles.ov}><label htmlFor="" className = {styles.la2}>{item.attrName} :</label><Dropdown.Button overlay={menu} className = {styles.sel}><a className="jc-dropdown-link" href="#">请选择</a></Dropdown.Button><Input className= {styles.inp} defaultValue = {value} onBlur = {(e)=>{this.inputChange(item.attrId,e);}} placeholder="输入属性描述" size="default" /></div><div className={styles.dis}>{this.divs}</div></div>);
				    			otherStatus2 = true;
				    			return;
				    		}else{
				    		}
				    	});
				    	if(!otherStatus2){
				    		this.drops.push(<div><div className = {styles.ov}><label htmlFor="" className = {styles.la2}>{item.attrName} :</label><Dropdown.Button overlay={menu} className = {styles.sel}><a className="jc-dropdown-link" href="#">请选择</a></Dropdown.Button><Input className= {styles.inp} onBlur = {(e)=>{this.inputChange(item.attrId,e);}} placeholder="输入属性描述" size="default" /></div><div className={styles.dis}>{this.divs}</div></div>);
				    	}else{}
			        }else{
			        	this.drops.push(<div><div className = {styles.ov}><label htmlFor="" className = {styles.la2}>{item.attrName} :</label><Dropdown.Button overlay={menu} className = {styles.sel}><a className="jc-dropdown-link" href="#">请选择</a></Dropdown.Button><Input className= {styles.inp} onBlur = {(e)=>{this.inputChange(item.attrId,e);}} placeholder="输入属性描述" size="default" /></div><div className={styles.dis}>{this.divs}</div></div>);
			        }
			    });
			    this.initInputValue = false;
	    }else{}
	    this.props.goodsRlease.saleData && (this.init = true);
    	this.props.checkStatus && this.props.ifcheckdStatus && this.changeAttrList(this.props.checkStatus)
	    return (
		    	<div id = 'spec' className="ui-container ui-platform" style = {{borderBottom: '1px solid #e9e9e9' , paddingBottom: '20px', overflow: 'hidden', background: 'white',paddingLeft: '16px'}}>
		    		<strong className = {styles.specialStyle}>规格参数</strong>
		    		{this.drops}
		    	</div>
	    )
    }
}
