/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card} from 'antd';
import BreadcrumbCustom from "@/components/BreadcrumbCustom";

const columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: text => <span>{text}</span>,
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
}, {
    title: '权限',
    dataIndex: 'is_public',
    key: 'is_public',
}, {
    title: '创建日期',
    dataIndex: 'create_time',
    key: 'create_time',
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
    "msg": "文章信息",
    "data": {
        "count": 58,
        "items": [
            {
                "id": 72,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "安装nodejs",
                "path": "install-nodejs",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2019-03-03T18:19:06+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 71,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "使用visual studio code 写c语言",
                "path": "vs-code-c",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2019-02-24T13:45:34+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 70,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "json web token",
                "path": "jwt",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-11-16T16:16:52+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 69,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "还原window自带app",
                "path": "restore-win10-apps",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-11-15T16:47:17+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 67,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "opencv",
                "path": "python-opencv",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-08-22T15:30:17+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 66,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "matplotlib ",
                "path": "python-matplotlib",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-08-21T16:53:44+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 65,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "python-02",
                "path": "python-02",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-08-06T11:04:59+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 64,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "python-01-环境搭建",
                "path": "python-01",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-08-06T09:50:47+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 37,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "numpy",
                "path": "python-numpy",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-08-01T16:00:55+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 63,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "python-00-前言",
                "path": "python-00",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-07-23T16:37:12+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 62,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "goweb-06-综合示例",
                "path": "goweb-06",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-07-23T09:09:26+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 61,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "goweb-05-golang-操作数据库",
                "path": "goweb-05",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-07-22T17:35:10+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 60,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "goweb-04-数据库",
                "path": "goweb-04",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-07-22T17:04:05+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 59,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "goweb-038-常用包net+http",
                "path": "goweb-03-8",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-07-20T11:50:06+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            },
            {
                "id": 58,
                "cate_id": 0,
                "user_id": 0,
                "type": 0,
                "status": 0,
                "title": "goweb-037-golang-常用包",
                "path": "goweb-03-7",
                "summary": "",
                "markdown_content": "",
                "content": "",
                "allow_comment": false,
                "create_time": "2018-07-20T08:22:37+08:00",
                "update_time": "0001-01-01T00:00:00Z",
                "is_public": false,
                "comment_num": 0,
                "options": ""
            }
        ]
    }
}


class PostList extends React.Component {
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
                                <Table rowKey={(r,i)=>i} columns={columns} dataSource={data.data.items}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PostList;