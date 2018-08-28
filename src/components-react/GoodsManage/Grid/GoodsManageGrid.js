/* *********************************************
* @author: GuoRuiGuang
* @creatdDate: 20171114
* @description: 平台店铺管理列表组件
* *********************************************/
import React, { Component, PropTypes } from 'react';
import { Button, Checkbox, Icon, message, Modal, Input, Form, Pagination } from 'jdcloudui';
import style from './style/grid.less';
import './style/griddetail.css';
import GoodsDetails from './GoodsDetails/GoodsDetails';
import { Loading } from 'jdcloudecc/components';
const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
export default class GoodsManageGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: {},
            visible: false,
            visible2: false,
            viewVisb: false,
            exraType: 70,
            viewType: 1,
            resonText: ''
        };
        this.checkArr = [];
        this.checkType = '';
    }

    //全选
    allChecked = () => {
        let check = {};
        this.props.data && this.props.data.length != 0 && this.props.data.forEach((item) => {
            check[item.id] = true;
        })
        this.setState({
            check: check
        });
    }

    //反选
    diffChecked = () => {
        let check = {};
        this.props.data && this.props.data.length != 0 && this.props.data.forEach((item) => {
            check[item.id] = !this.state.check[item.id];
        })
        this.setState({ check: check });
    }

    //更改单个选中状态
    onChange = (e, id) => {
        const checkState = Object.assign({}, this.state.check);
        checkState[id] = e.target.checked;
        this.setState({ check: checkState });
    }

    //批量驳回/锁定
    onRejectOrLock = (type) => {
        const checkState = Object.assign({}, this.state.check);
        let arr = [];
        Object.entries(checkState).forEach(item => {
            item[1] && arr.push(item[0]);
        })
        if (arr.length) {
            this.checkArr = arr;
            this.checkType = type;
            this.setState({
                check: {},
                exraType: type,
                visible: true
            });
        } else {
            message.warning("请选择要操作的商品", 1)
        }
    }

    //驳回、锁定方法(单条数据)
    handleRejectOrLock = (arr, type) => {
        let a = [];
        a.push(arr);
        this.checkArr = a;
        this.checkType = type;
        // let exra = type =='70' ? 1 :2;
        this.setState({ exraType: type, visible: true })
    }
    handleOk = (e) => {
        if (!this.props.form.getFieldValue("content")) {
            message.warning("请填写原因", 1)
        } else {
            this.setState({
                visible: false,
            });
            let text = this.props.form.getFieldValue("content");
            this.props.onRejectOrLock(this.checkArr, this.checkType, text)
            this.props.form.setFieldsValue({
                content: '',
            });
        }
    }
    handleCancel = (e) => {
        this.checkArr = [];
        this.checkType = '';
        this.setState({
            visible: false,
        });
    }

    //批量下架
    downDateAll = () => {
        const checkState = Object.assign({}, this.state.check);
        let arr = [];
        Object.entries(checkState).forEach(item => {
            item[1] && arr.push(item[0]);
        })
        if (arr.length) {
            this.checkArr = arr;
            this.checkType = 50;
            this.setState({
                visible2: true,
                check: {}
            });
        } else {
            message.warning("请选择要下架的商品", 1)
        }
    }
    //下架方法(单条数据)
    handleChangeBatchData = (arr, type) => {
        let a = [];
        a.push(arr);
        this.checkArr = a;
        this.checkType = type;
        this.setState({ visible2: true })
    }

    handleBatchShelves = () => {
        if (!this.props.form.getFieldValue("batchShevlesText")) {
            message.warning("请填写原因", 1)
        } else {
            this.setState({
                visible2: false,
            });
            let text = this.props.form.getFieldValue("batchShevlesText");
            this.props.onBatchShelves(this.checkArr, this.checkType, text)
            this.props.form.setFieldsValue({
                batchShevlesText: '',
            });
        }
    }
    handleCancel2 = () => {
        this.setState({
            visible2: false,
        });
    }

    //通过
    handlePassItems = () => {
        const checkState = Object.assign({}, this.state.check);
        let arr = [];
        Object.entries(checkState).forEach(item => {
            item[1] && arr.push(item[0]);
        })
        if (arr.length) {
            this.checkArr = arr;
            this.checkType = '';
            this.props.onPassItem(arr);
            this.setState({
                check: {}
            });
        } else {
            message.warning("请选择要通过的商品", 1)
        }
    }
    //通过(单条数据)
    handlePassItem = (arr) => {
        let a = [];
        a.push(arr);
        this.checkArr = a;
        this.checkType = '';
        this.props.onPassItem(this.checkArr);
    }

    //查看锁定、驳回原因
    handleViewReason = (text, type) => {
        this.setState({
            viewType: type,
            viewVisb: true,
            resonText: text
        })
    }
    handleClose = () => {
        this.setState({
            viewVisb: false,
        })
    }

    //分页搜索
    handlePaginationChange = (pageNumber) => {
        this.props.onPaginationSearch(pageNumber);
    }

    render() {
        console.log(this.props.host)
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.gridWrapper}>
                <div className={style.btnWrapper}>
                    <span className={style.marginL10}>
                        <Button type="primary" onClick={this.allChecked}>全选</Button>
                    </span>
                    <span className={style.marginL10}>
                        <Button type="primary" onClick={this.diffChecked}>反选</Button>
                    </span>
                    <span className={style.marginL10}>
                        <Button type="primary" onClick={this.handlePassItems}>通过</Button>
                    </span>
                    <span className={style.marginL10}>
                        <Button type="primary" onClick={() => { this.onRejectOrLock(70) }}>驳回</Button>
                    </span>
                    <span className={style.marginL10}>
                        <Button type="primary" onClick={() => { this.onRejectOrLock(80) }}>锁定</Button>
                    </span>
                    <span className={style.marginL10}>
                        <Button type="primary" onClick={this.downDateAll}>下架</Button>
                    </span>
                </div>

                <div>
                    {
                        this.props.data && this.props.data.length != 0 ? this.props.data.map((item, i) => {
                            return (
                                <GoodsDetails
                                    key={item.id}
                                    data={item}
                                    onChange={(e, id) => this.onChange(e, id)}
                                    check={this.state.check}
                                    updateItembatchShelves={this.updateItembatchShelves}
                                    pagination={this.props.pagination}
                                    onPaginationSearch={this.props.onPaginationSearch}
                                    handleRejectOrLock={this.handleRejectOrLock}
                                    handleChangeBatchData={this.handleChangeBatchData}
                                    handlePassItem={this.handlePassItem}
                                    handleViewReason={this.handleViewReason}
                                    onSearchPrice = {this.props.onSearchPrice}
                                    price = {this.props.price}
                                    paramsData = {this.props.paramsData}
                                    host = {this.props.host}
                                />
                            )
                        })
                            :
                            <div className={style.nodata}><span className="mr5"><Icon type="frown-o" /></span><span>暂无数据</span></div>
                    }
                    {
                        this.props.pagination ?
                            <div className='paginationWrapper'>
                                <Pagination showQuickJumper
                                    current={this.props.pagination.pageNum}
                                    total={this.props.pagination.totalCount}
                                    pageSize={this.props.pagination.pageSize}
                                    onChange={this.handlePaginationChange}
                                />
                            </div>
                            :
                            null
                    }
                </div>

                <div>
                    <Modal
                        title={this.state.exraType == 70 ? '驳回原因' : (this.state.exraType == 80 ? '锁定原因' : '下架原因')}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form>
                            <FormItem>
                                {getFieldDecorator('content', )(
                                    <TextArea rows={4} maxLength={500} />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>

                    <Modal
                        title='下架原因'
                        visible={this.state.visible2}
                        onOk={this.handleBatchShelves}
                        onCancel={this.handleCancel2}
                    >
                        <Form>
                            <FormItem>
                                {getFieldDecorator('batchShevlesText', )(
                                    <TextArea rows={4} maxLength={500} />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>

                    <Modal
                        title={this.state.viewType == 1 ? '驳回原因' : (this.state.viewType == 2 ? '锁定原因' : '下架原因')}
                        visible={this.state.viewVisb}
                        footer={[
                            <Button key="back" size="large" onClick={this.handleClose}>关闭</Button>
                        ]}
                        closable={false}
                    >
                        <Form>
                            <FormItem>
                                <TextArea value={this.state.resonText} rows={4} disabled={true} maxLength={500} />
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            </div>
        );
    }
}