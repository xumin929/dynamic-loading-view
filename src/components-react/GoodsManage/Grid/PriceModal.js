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
        console.log(value);
        const data = {
            labelId: item.id,
            labelPrice: value,
            labelName: item.name,
        };
        this.props.changePrice(index, data, record)
    };

    handleOk = (record) => {
        const {type} = this.state;
        if(record.isPrice && !type) {
            this.setState({
                type: true
            })
        } else {
            const {data} = this.props;
            if(data.length > 0) {
                this.props.handleOk();
            } else {
                message.error('请至少设置一条分组价！');
            }
        }
    };


    render() {
        const {visible, record, data, handleModal, priceList} = this.props;
        const {type} = this.state;

        console.log(data);

        return (
            <Modal
                className="tabs-box-content"
                title={record.isPrice && !type ? '查看分组价' : '添加分组价'}
                visible={visible}
                onCancel={() => handleModal(false)}
                footer={null}
            >
                {
                    record.isPrice && !type  ? (
                        <div style={{padding: '38px 38px 50px', maxHeight: '500px', overflow: 'auto'}}>
                            {
                                data.map(item => {
                                    return (
                                        <div style={{lineHeight: '30px'}}>
                                            <span style={{color: '#ccc'}}>{item.labelName}：</span>
                                            <span>￥{(item.labelPrice || 0).toFixed(2)}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div>
                            <Tabs
                                type="editable-card"
                            >
                                {
                                    priceList.map((item,index) => (
                                        <TabPane tab={item.name} key={item.id}>
                                            <div style={{padding: '20px 100px 60px'}}>
                                                <span style={{color: '#ccc'}}>售价：</span>
                                                <span>￥</span>
                                                <InputNumber
                                                    min={0}
                                                    placeholder="请输入价格"
                                                    onChange={(v) => this.onChange(v, index, item, record)}
                                                    style={{width: '200px'}}
                                                    value={data.filter(_i => _i.labelId == item.id)[0] && data.filter(_i => _i.labelId == item.id)[0].labelPrice || null}
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