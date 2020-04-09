/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, message, Modal} from 'antd';
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import {_get, _post} from "@/utils/requests";
import tools from "@/utils/tools";
import TaskAdd from "@/components/task/TaskAdd";


class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false
        };
    }

    componentDidMount() {
        _get('/api/taskLog/TaskLogList', {}, res => {
            if (res.code == 200) {
                this.setState({data: res.data})
            } else {
                message.error(res.msg)
            }
        })
    }

    handleDelete(taskName) {
        Modal.confirm({
            title: `确定删除任务${taskName}`,
            content: "",
            onOk() {
                 _post('/api/task/TaskDelete', {taskName: taskName}, res => {
                    if (res.code == 200) {
                        message.success("删除成功", 2, () => window.location.reload())
                    } else {
                        message.error(res.msg)
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    }


    render() {
        const {data, visible} = this.state
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id', key: 'id',
            },
            {
                title: '任务名称',
                dataIndex: 'taskName',
                key: 'taskName',
            },
            {
                title: '运行状态',
                dataIndex: 'status',
                key: 'status',
                render:(value,row)=>value==0?'成功':'失败'
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
                                title={
                                    <div>
                                        <span>日志列表</span>
                                    </div>
                                }
                                bordered={false}>
                                <Table rowKey={(r, i) => i} columns={columns} dataSource={data}/>
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

export default TaskList;