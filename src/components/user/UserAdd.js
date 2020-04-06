/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, Input, Checkbox, Form, Select, message} from 'antd';
import {_post} from "@/utils/requests";
import tools from "@/utils/tools";


class UserAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不匹配!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                _post('/api/user/UserAdd', values, res => {
                    if (res.code == 200) {
                        this.props.onCancel()
                        message.success("创建成功",2,()=>window.location.reload())
                    } else {
                        message.error(res.msg)
                    }
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label={'用户名'}
                    >
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名!', whitespace: true}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: '无效邮箱!',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写密码!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password/>)}
                    </Form.Item>
                    <Form.Item label="密码确认" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请再次填写密码!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                        <Button onClick={() => this.props.onCancel()}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

UserAdd = Form.create()(UserAdd);
export default UserAdd;