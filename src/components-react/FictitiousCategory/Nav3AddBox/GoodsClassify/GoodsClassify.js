/**
 * Created by songsong on 2018/1/31.
 */
import React from 'react'
import {Tree, Checkbox, Row, Col} from 'jdcloudui'

const TreeNode = Tree.TreeNode
import './style.css'
import s from './s.less'

var _ = require('lodash')
const GoodsClassifyList = (props) => {
  const {data, changeActiveId, activeId, changeCheck} = props
  const handleClick = (cid) => {
    changeActiveId(cid)
  }
  const handleCheck = (lev, e) => {
    const key = e.target.value
    const checked = e.target.checked
    changeCheck(key, checked, lev)
  }
  return (
    <ul className={s.classifyList}>
      {data.map(item => <li
        className={`${activeId == item.cid ? s.active : ''} ${s.goodsClassityItem}`}
        key={item.cid}
        onClick={handleClick.bind(null, item.cid)}
      >
        <Checkbox checked={item.checked} indeterminate={item.indeterminate} onChange={handleCheck.bind(null, item.lev)}
                  value={item.cid}/>
        <a className={`${s.checkBoxText} `} title={item.categoryName}>{item.categoryName}</a>
      </li>)}
    </ul>
  )
}
export default class extends React.Component {
  state = {
    activeId1: -1,
    activeId2: -1,
    activeId3: -1,
    activeId4: -1,
  }

  componentDidMount() {
    const { category3FlattenArray, category3edited} = this.props
    this.initialActiveId(category3FlattenArray,category3edited)
  }

  componentWillReceiveProps(nextprops) {
    const { category3FlattenArray, category3edited} = nextprops
    this.initialActiveId(category3FlattenArray,category3edited)
  }

  componentDidUpdate() {
    if (!this.scrolled && this.props.category3FlattenArray.length) {
      this.scrolled = true
      const datas = [this.data1, this.data2, this.data3, this.data4]
      const activeIds = [this.state.activeId1, this.state.activeId2, this.state.activeId3, this.state.activeId4]
      const uls = document.querySelectorAll('.nav3-modal ul')
      console.log('ul', uls, datas, activeIds)
      uls.forEach((ul, index) => {
        ul.scrollTop = ul.scrollHeight * _.findIndex(datas[index], {'cid': activeIds[index]}) / datas[index].length

      })
    }
  }

  shouldComponentUpdate(nextprops, nextstate) {
    if (nextstate.activeId1 < 0) return false
    return true
  }
  initialActiveId(category3FlattenArray,category3edited){
    if (this.state.activeId1 > 0) return
    if (this.props.isEdit) {
      if( category3edited.length == 0)return
      const activeId1 = category3FlattenArray.find(item => item.checked || item.indeterminate).cid
      const activeId2 = (category3FlattenArray.filter(item => item.parentCid == activeId1).find(item => item.checked || item.indeterminate) || {}).cid
      const activeId3 = (category3FlattenArray.filter(item => item.parentCid == activeId2).find(item => item.checked || item.indeterminate) || {}).cid
      const activeId4 = (category3FlattenArray.filter(item => item.parentCid == activeId3).find(item => item.checked || item.indeterminate) || {}).cid
      this.setState({activeId1, activeId2, activeId3, activeId4})
      //新增，显示第一个
    } else {
      console.log('新增')
      const activeId1 = (category3FlattenArray[0] || {}).cid
      const activeId2 = (category3FlattenArray.find(item => item.parentCid == activeId1) || {}).cid
      const activeId3 = (category3FlattenArray.find(item => item.parentCid == activeId2) || {}).cid
      const activeId4 = (category3FlattenArray.find(item => item.parentCid == activeId3) || {}).cid
      this.setState({activeId1, activeId2, activeId3, activeId4})
    }
  }
  changeActiveId1 = (activeId, data) => {
    const category3FlattenArray = this.props.category3FlattenArray
    const activeId1 = activeId

    const activeId2 = (category3FlattenArray.find(item => item.parentCid == activeId1) || {}).cid
    const activeId3 = (category3FlattenArray.find(item => item.parentCid == activeId2) || {}).cid
    const activeId4 = (category3FlattenArray.find(item => item.parentCid == activeId3) || {}).cid
    this.setState({activeId1, activeId2, activeId3, activeId4})

  }
  changeActiveId2 = (activeId, data) => {
    const category3FlattenArray = this.props.category3FlattenArray

    const activeId2 = activeId
    const activeId3 = (category3FlattenArray.find(item => item.parentCid == activeId2) || {}).cid
    const activeId4 = (category3FlattenArray.find(item => item.parentCid == activeId3) || {}).cid
    this.setState({activeId2, activeId3, activeId4})

  }
  changeActiveId3 = (activeId, data) => {
    const category3FlattenArray = this.props.category3FlattenArray

    const activeId3 = activeId
    const activeId4 = (category3FlattenArray.find(item => item.parentCid == activeId3) || {}).cid

    this.setState({activeId3, activeId4})
  }
  changeActiveId4 = (activeId, data) => {
    this.setState({activeId4: activeId})
  }
  changeCheck = (key, checked, lev) => {
    this.props.changeCategory3Arr({key, checked, lev, handleCheck: this.props.handleCheck})
  }

  render() {
    const {activeId1, activeId2, activeId3, activeId4} = this.state
    const category3FlattenArray = this.props.category3FlattenArray
    const category3edited = this.props.category3edited
    const data1 = category3FlattenArray.filter((item) => item.parentCid == -1)
    const data2 = category3FlattenArray.filter((item) => item.parentCid == activeId1)
    const data3 = category3FlattenArray.filter((item) => item.parentCid == activeId2)
    const data4 = category3FlattenArray.filter((item) => item.parentCid == activeId3)
    this.data1 = data1
    this.data2 = data2
    this.data3 = data3
    this.data4 = data4
    console.log('category3FlattenArray======', category3FlattenArray)
    console.log('category3edited======', category3edited)
    console.log(activeId1, activeId2, activeId3, activeId4, data1, data2, data3, data4, 'dadadada')
    return (<div>
      <Row>
        <Col span="6" className={s.listBox}>
          <GoodsClassifyList
            data={data1}
            changeActiveId={this.changeActiveId1}
            activeId={activeId1}
            changeCheck={this.changeCheck}
          />
        </Col>
        <Col span="6" className={s.listBox}>
          <GoodsClassifyList
            data={data2}
            changeActiveId={this.changeActiveId2}
            activeId={activeId2}
            changeCheck={this.changeCheck}
          />
        </Col>
        <Col span="6" className={s.listBox}>
          <GoodsClassifyList
            data={data3}
            changeActiveId={this.changeActiveId3}
            activeId={activeId3}
            changeCheck={this.changeCheck}
          />
        </Col>
        <Col span="6" className={s.listBox}>
          <GoodsClassifyList
            data={data4}
            activeId={activeId4}
            changeActiveId={this.changeActiveId4}
            changeCheck={this.changeCheck}

          />
        </Col>
      </Row>


    </div>)
  }
}
