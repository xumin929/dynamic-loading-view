import React, {Component} from 'react';

export default class SkuList extends Component {
	constructor(props, context){
		super(...arguments)
		this.skuListTpl = [];
	}

	setSkuDom(){
		for(let i=0, _data = this.props.data, _size= _data.length; i<_size; i++){
			this.skuListTpl.push(
				<tr key={i}>
                    <td>供应商A {_data[i].skuId}</td>
                    <td>销量：99999</td>
                    <td></td>
                    <td><span className="fb mr10">全国统一价</span> 供货价：<span className="txt-red">￥{_data[i].supplyPrice}</span></td>
                    <td>基础备货：<span className="txt-red">￥123</span><a className="fr mr10">查看</a></td>
                 </tr>);
		}
	}

	render(){
		this.setSkuDom();
		return (
			<tr>
				<td colSpan="5" style={{padding:0}}>
					<table>
						<colgroup>
		                     <col/>
		                     <col/>
		                     <col style={{width: 170}} />
		                     <col style={{width: 310}} />
		                     <col style={{width: 310}} />
		                </colgroup>
						<tbody>
						{this.skuListTpl}
					</tbody>
					</table>
				</td>
			</tr>
		)
	}

}
