/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 管理员信息设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Select, Row, Col} from 'jdcloudui';
const Option = Select.Option;

/* **********  自定义组件  ********** */
import '../../style/table_border.css';

class AdminInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      dataArr: []
    }
  }

  componentWillMount() {
    //获取平台运营人员以及发布人员
    this.props.queryLoginInfo().then(rs => {
      console.log(rs);
      if (rs.code == 0) {
        this.props.queryAllAdminUser().then(dt => {
          if (rs.code == 0) {
            this.setState({user: rs.data, dataArr: dt.data});
            this.setState(this.props.setParamete('publishuserId', rs.data.userId));
          }
        });
      }
    })
  }

  handelChange = (value) => {
    this.props.setParamete('operatorId', value);
  };

  render() {
    let { user, dataArr } = this.state;
    let operatorId = this.props.params ? this.props.params.operatorId : null;

    return (
      <div className="mt15">
        <strong className="f-fs14">管理员信息</strong>
        <Row className="mt10">
          <Col span={10}>
            <Row className="label-box">
              <Col span={6} className="f-tar f-ib">
                <label htmlFor="商品发布" className="labelTitle"><i className="text-red mr5">*</i>商品发布：</label>
              </Col>
              <Col span={18}>
                {
                  user.userId ? (
                      <Select defaultValue={user.userId} className="labelSelect">
                        <Option value={user.userId}>{user.username}</Option>
                      </Select>
                    ) : null
                }
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row className="label-box">
              <Col span={6} className="f-tar">
                <label htmlFor="商品运营" className="labelTitle"><i className="text-red mr5">*</i>商品运营：</label>
              </Col>
              <Col span={18}>
                <Select className="labelSelect" value={ operatorId } onChange={::this.handelChange}>
                  {
                    dataArr.map((item, index) => <Option key={index} value={item.id}>{item.username}</Option>)
                  }
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AdminInformation;
