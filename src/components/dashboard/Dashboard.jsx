/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import {Row, Col, Card, Timeline, Icon, message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import moment from "moment"
import {_get, _post} from "@/utils/requests";


let date = []
for (let i = 0; i < 7; i++) {
    let j = 0 - i
    let d = moment().add(j, 'days').format('YYYY-MM-DD')
    date.unshift(d)
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        _post('/api/home/dashboard', {}, res => {
            if (res.code == 200) {
                this.setState({data: res.data})
            } else {
                message.error(res.msg)
            }
        })
    }

    render() {
        const {data} = this.state
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom/>
                <Row gutter={24}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <div className="clear y-center">
                                <div className="pull-left mr-m">
                                    <Icon type="user" className="text-2x text-info "/>
                                </div>
                                <div className="clear">
                                    <div className="text-muted">用户数量</div>
                                    <h2>{data.userLength}</h2>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <div className="clear y-center">
                                <div className="pull-left mr-m">
                                    <Icon type="code" className="text-2x"/>
                                </div>
                                <div className="clear">
                                    <div className="text-muted">任务数量</div>
                                    <h2>{data.taskLength}</h2>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <div className="clear y-center">
                                <div className="pull-left mr-m">
                                    <Icon type="check" className="text-2x text-success"/>
                                </div>
                                <div className="clear">
                                    <div className="text-muted">成功次数</div>
                                    <h2>{data.successTaskLength}</h2>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <div className="clear y-center">
                                <div className="pull-left mr-m">
                                    <Icon type="close" className="text-2x  text-danger"/>
                                </div>
                                <div className="clear">
                                    <div className="text-muted">失败次数</div>
                                    <h2>{data.failedTaskLength}</h2>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>开发任务</h3>
                                    <small>3个已经完成，1个待完成，其他正在进行中</small>
                                </div>
                                <span className="card-tool"><Icon type="sync"/></span>
                                <Timeline>
                                    <Timeline.Item color="green">
                                        <p>{date[6]}</p>
                                        <p>版本迭代持续中</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">
                                        <p>{date[5]}</p>
                                        <p>只完成了用户管理</p>

                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>{date[4]}</p>
                                        <p>联调接口</p>
                                    </Timeline.Item>

                                    <Timeline.Item color="#108ee9">
                                        <p>{date[3]}</p>
                                        <p>登录功能</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>最近一次执行结果</h3>
                                </div>
                                <span className="card-tool"><Icon type="sync"/></span>
                                <ul className="list-group no-border">
                                    {data.tLogs && data.tLogs.map(d => {

                                        return (
                                            <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            {
                                                d.taskLog.status == 0
                                                    ? <Icon type="check-circle" className="text-2x text-success "/>
                                                    : <Icon type="close-circle" className="text-2x text-danger "/>
                                            }

                                        </span>
                                                <div className="clear">
                                                    <span className="block">{d.taskName}</span>
                                                    {
                                                        d.taskLog.status == 0
                                                            ? <span className="text-muted">{d.taskLog.output}</span>
                                                            : <span className="text-muted">{d.taskLog.error}</span>
                                                    }

                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>任务执行次数统计</h3>
                                    <small>最近7天执行次数</small>
                                </div>
                                <span className="card-tool"><Icon type="sync"/></span>
                                <EchartsViews/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;