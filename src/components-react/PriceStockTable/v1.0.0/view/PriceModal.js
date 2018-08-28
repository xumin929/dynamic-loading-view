
import React, {Component} from 'react';
import { Modal, InputNumber, Tabs, message} from 'jdcloudui';
const TabPane = Tabs.TabPane;


export default class PriceModal extends Component {
  constructor(){
    super();
    this.state = {
      type: false
    };

  }

  onChange = (value, index, item, record) => {
    const data = {
      labelId: item.shopCustomerLabelId,
      labelPrice: value,
      labelName: item.labelName,
    };
    this.props.changePrice(index, data, record);
  };

  handleOk = (record) => {
    const {type} = this.state;
    if(record.isPrice && !type) {
      this.setState({
        type: true
      })
    } else {
      const {data} = this.props;
      const dataPrice = data.filter(item => item.labelPrice);
      if(dataPrice.length > 0) {
        if(record.key === undefined) {
          this.props.handleOk(true);
        } else {
          this.props.handleOk();
        }
      } else {
        message.error('请至少设置一条分组价！');
      }
    }
  };


  render() {
    // console.log(this.props.data, '11111111111111111111111111111111111111111111111');
    const {visible, record, data, handleModal, priceList} = this.props;
    const {type} = this.state;
    const priceData = data.filter(item => item && item.labelPrice);


    return (
      <Modal
        maskClosable={false}
        className="tabs-box-content"
        title={record.isPrice && !type ? '查看分组价' : '添加分组价'}
        visible={visible}
        onOk={() => this.handleOk(record)}
        onCancel={() => handleModal(false,{})}
        cancelText={record.isPrice && !type ? '确认' : '取消'}
        okText={record.isPrice && !type ? '编辑' : '确认'}
      >
        {
          record.isPrice && !type  ? (
            <div style={{padding: '20px 60px', maxHeight: '500px', overflow: 'auto'}}>
              {
                priceData.map(item => {
                  return (
                    <div style={{lineHeight: '30px'}}>
                      <span style={{color: '#ccc'}}>{item.labelName}：</span>
                      <span>￥{item.labelPrice.toFixed(2)}</span>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div>
              <Tabs
                type="card"
                hideAdd
                forceRender
              >
                {
                  priceList.map((item,index) => (
                    <TabPane 
                        tab={<span title={item.labelName} style={{width:'46px',overflow:'hidden',whiteSpace: 'nowrap', textOverflow: 'ellipsis', display:'inline-block',textAlign:'center'}}>{item.labelName}</span>} 
                        key={item.shopCustomerLabelId}>
                      <div style={{padding: '20px 100px 60px'}}>
                        <span style={{color: '#ccc'}}>售价：</span>
                        <span>￥</span>
                        <InputNumber
                          min={0}
                          placeholder="请输入价格"
                          onChange={(v) => this.onChange(v, index, item, record)}
                          style={{width: '200px'}}
                          value={priceData.filter(_i => _i.labelId == item.shopCustomerLabelId)[0] && priceData.filter(_i => _i.labelId == item.shopCustomerLabelId)[0].labelPrice || null}
                        />
                      </div>
                    </TabPane>
                  ))
                }
              </Tabs>
            </div>
          )
        }
      </Modal>
    );
  }
}
