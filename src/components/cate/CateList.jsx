/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card} from 'antd';
import BreadcrumbCustom from "@/components/BreadcrumbCustom";

const columns = [
    {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    render: text => <span>{text}</span>,
},{
    title: '分类名',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
}, {
    title: '权限',
    dataIndex: 'pid',
    key: 'pid',
}, {
    title: '分类介绍',
    dataIndex: 'intro',
    key: 'intro',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <Button>Action 一 {record.name}</Button>
            <span className="ant-divider"/>
            <Button>Delete</Button>
            <span className="ant-divider"/>
            <Button className="ant-dropdown-link">
                More actions <Icon type="down"/>
            </Button>
        </span>
    ),
}];

const data = {
    "code": 200,
    "msg": "分类信息",
    "data": [
        {
            "id": 1,
            "name": "博客文章",
            "pid": 0,
            "intro": "article"
        },
        {
            "id": 3,
            "name": "学习笔记",
            "pid": 0,
            "intro": "learn"
        },
        {
            "id": 4,
            "name": "动态网站",
            "pid": 0,
            "intro": "goweb"
        },
        {
            "id": 5,
            "name": "python",
            "pid": 0,
            "intro": "python"
        },
        {
            "id": 6,
            "name": "javascript",
            "pid": 0,
            "intro": "javascript"
        }
    ]
}


class CateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creditTypes: [],
            shopList: []
        };
    }

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="表格" second="基础表格"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="基础表格" bordered={false}>
                                <Table rowKey={(r,i)=>i} columns={columns} dataSource={data.data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CateList;