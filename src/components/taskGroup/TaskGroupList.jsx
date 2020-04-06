/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, message, Modal} from 'antd';
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import {_get, _post} from "@/utils/requests";
import TaskGroupAdd from "@/components/taskGroup/TaskGroupAdd";


class TaskGroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        _get('/api/taskGroup/TaskGroupList', {}, res => {
            if (res.code == 200) {
                this.setState({data: res.data})
            } else {
                message.error(res.msg)
            }
        })
    }

    handleDelete(groupName) {
        Modal.confirm({
            title: `确定删除任务分组${groupName}`,
            content: "",
            onOk() {
                 _post('/api/taskGroup/TaskGroupDelete', {groupName: groupName}, res => {
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
        const {data, visible } = this.state
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '分组名称',
                dataIndex: 'groupName',
                key: 'groupName',
            }, {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            }, {
                title: '操作',
                key: 'action',
                render: (value, row) => (
                    <span>
            <Button style={{marginLeft: '5px',backgroundColor:'#EC971F',color:'white'}} onClick={() => message.warning('功能开发中')}>编辑</Button>
            <Button style={{marginLeft: '5px'}} type={'danger'} onClick={() => this.handleDelete(row.groupName)}>删除</Button>
        </span>
                ),
            }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="任务分组管理" second="任务分组列表"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card
                                title={
                                    <div>
                                        <span>任务列表 | </span>
                                        <Button type={'primary'} onClick={() => this.setState({visible: true})}>
                                            新建分组
                                        </Button>
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
                    title="新建分组"
                    destroyOnClose
                    closable
                    width={'600px'}
                    onCancel={() => this.setState({visible: false})}
                    footer={false}
                >
                    <TaskGroupAdd onCancel={() => this.setState({visible: false})}/>
                </Modal>
            </div>
        )
    }
}

export default TaskGroupList;