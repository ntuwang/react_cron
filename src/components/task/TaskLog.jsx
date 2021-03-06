/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, message, Modal, Form, Select, Input, DatePicker} from 'antd';
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import {_get, _post} from "@/utils/requests";
import tools from "@/utils/tools";
import TaskAdd from "@/components/task/TaskAdd";
import {connectAlita} from "redux-alita";
import moment from "moment"


const {Option} = Select
const {RangePicker} = DatePicker;

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            taskList: []
        };
    }

    componentDidMount() {
        this.setTaskLogRecords()
        _get('/api/task/TaskList', {}, res => {
            if (res.code == 200) {
                this.setState({taskList: res.data})
            } else {
                message.error(res.msg)
            }
        })
    }

    setTaskLogRecords(data = {}) {
        const {setAlitaState} = this.props;
        let url = '/api/taskLog/TaskLogList'
        _post(url, data, res => {
            if (res.code == 200) {
                // this.setState({data: res.data})
                setAlitaState({stateName: 'taskLogRecords', data: res.data});
            } else {
                message.error(res.msg)
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {datetime} = values
                let params = values
                if (datetime) {
                    let startTime = moment(datetime[0]).format('YYYY-MM-DD')
                    let endTime = moment(datetime[1]).format('YYYY-MM-DD')
                    params.datetime = `${startTime} ~ ${endTime}`
                }

                this.setTaskLogRecords(values)
            }
        })
    }


    render() {
        const {visible,taskList} = this.state
        const {getFieldDecorator} = this.props.form
        const taskLogRecords = this.props.taskLogRecords.data
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id', key: 'id',
            },
            {
                title: '任务名称',
                dataIndex: 'task',
                key: 'task',
                render: (value, row) => value.taskName
            },
            {
                title: '运行状态',
                dataIndex: 'status',
                key: 'status',
                render: (value, row) => value == 0 ? '成功' : '失败'
            },
            {
                title: '执行时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作',
                key: 'action',
                render: (value, row) => (
                    <span>
                    <Button type={'primary'}
                            onClick={() => message.warning('功能开发中')}>查看日志</Button>
                    </span>),
            }];

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="任务管理" second="日志列表"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">

                            <Card
                                title={'日志列表'}
                                bordered={false}>
                                <div>
                                    <Form layout="inline" onSubmit={this.handleSubmit}>
                                        <Form.Item label="任务名称" >
                                            {getFieldDecorator('taskName', {})(
                                                <Select style={{width: 200}} placeholder={"请选择"} allowClear>
                                                    {taskList.map(t=><Option key={t.id} value={0}>{t.taskName}</Option>)}
                                                </Select>,
                                            )}
                                        </Form.Item>
                                        <Form.Item label="运行状态" style={{marginRight: '28px'}}>
                                            {getFieldDecorator('status', {})(
                                                <Select style={{width: 120}} placeholder={"请选择"} allowClear>
                                                    <Option value={0}>成功</Option>
                                                    <Option value={-1}>失败</Option>
                                                </Select>,
                                            )}
                                        </Form.Item>
                                        <Form.Item label="运行时间" style={{marginRight: '28px'}}>
                                            {getFieldDecorator('datetime', {})(
                                                <RangePicker/>,
                                            )}
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                搜索
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <br/>
                                <div>
                                    <Table rowKey={(r, i) => i} columns={columns} dataSource={taskLogRecords}/>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal
                    style={{top: 20}}
                    visible={visible}
                    title="新建任务"
                    destroyOnClose
                    closable
                    width={'600px'}
                    onCancel={() => this.setState({visible: false})}
                    footer={false}
                >
                    <TaskAdd onCancel={() => this.setState({visible: false})}/>
                </Modal>
            </div>
        )
    }
}

TaskList = Form.create()(TaskList)
export default connectAlita([{taskLogRecords: []}])(TaskList)