/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, Input, Checkbox, Form} from 'antd';
import BreadcrumbCustom from "@/components/BreadcrumbCustom";

const FormItem = Form.Item

class CateAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creditTypes: [],
            shopList: []
        };
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="表格" second="基础表格"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="基础表格" bordered={false}>
                                <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{required: true, message: '请输入用户名!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                   placeholder="用户名"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: '请输入密码!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                                   placeholder="密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>记住我</Checkbox>
                                        )}
                                        <span className="login-form-forgot" style={{float: 'right'}}>忘记密码</span>
                                        <Button type="primary" htmlType="submit" className="login-form-button"
                                                style={{width: '100%'}}>
                                            登录
                                        </Button>
                                        或 <span>现在就去注册!</span>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
CateAdd = Form.create()(CateAdd);
export default CateAdd;