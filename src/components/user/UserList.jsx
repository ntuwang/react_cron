/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, message, Modal, Input, Checkbox, Form} from 'antd';
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import {_get, _post} from "@/utils/requests";
import tools from "@/utils/tools";
import UserAdd from "./UserAdd"
import UserEdit from "./UserEdit"


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            visibleEdit: false,
            row_line: {}
        };
    }

    componentDidMount() {
        _get('/api/user/UserList', {}, res => {
            if (res.code == 200) {
                this.setState({data: res.data})
            } else {
                message.error(res.msg)
            }
        })
    }

    handleDelete(username) {
        Modal.confirm({
            title: `确定删除用户${username}`,
            content: "",
            onOk() {
                if(username=='admin'){
                    message.error("禁止删除admin用户")
                }else {
                    _post('/api/user/UserDelete', {username: username}, res => {
                    if (res.code == 200) {
                        message.success("删除成功", 2, () => window.location.reload())
                    } else {
                        message.error(res.msg)
                    }
                })
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    }

    render() {
        const {data, visible, visibleEdit, row_line} = this.state

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            }, {
                title: '上次登录',
                dataIndex: 'lastLogin',
                key: 'lastLogin',
            }, {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            }, {
                title: '操作',
                key: 'action',
                render: (value, row) => (
                    <span>
            <Button style={{marginLeft: '5px',backgroundColor:'#EC971F',color:'white'}} onClick={() => this.setState({visibleEdit: true,row_line:row})}>编辑</Button>
            <Button style={{marginLeft: '5px'}} type={'danger'} onClick={() => this.handleDelete(row.username)}>删除</Button>
        </span>
                ),
            }];

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="用户管理" second="用户列表"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card
                                title={
                                    <div>
                                        <span>用户列表 | </span>
                                        <Button type={'primary'} onClick={() => this.setState({visible: true})}>
                                            新建用户
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
                    title="新建用户"
                    destroyOnClose
                    closable
                    width={'600px'}
                    onCancel={() => this.setState({visible: false})}
                    footer={false}
                >
                    <UserAdd onCancel={() => this.setState({visible: false})}/>
                </Modal>
                <Modal
                    style={{top: 20}}
                    visible={visibleEdit}
                    title="编辑用户"
                    destroyOnClose
                    closable
                    width={'600px'}
                    onCancel={() => this.setState({visibleEdit: false})}
                    footer={false}
                >
                    <UserEdit onCancel={() => this.setState({visibleEdit: false})} username={row_line.username}/>
                </Modal>
            </div>
        )
    }
}

export default UserList;