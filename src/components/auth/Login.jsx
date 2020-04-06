/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {PwaInstaller} from '../widget';
import {connectAlita} from 'redux-alita'
import {_post} from "utils/requests"
import tools from "utils/tools"


const FormItem = Form.Item;

class Login extends React.Component {
    componentDidMount() {
        const {setAlitaState} = this.props;
        setAlitaState({stateName: 'auth', data: null});
    }

    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const {auth: nextAuth = {}, history} = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let data = {
                    username: values.userName,
                    password: values.password
                };
                _post('/api/login', data, res => {
                    if (res.code == 200) {
                        tools.setItem('expireTime',res.data.expireTime)
                        tools.setToken(res.data.token);
                        history.push('/app/dashboard/index');
                    } else {
                        message.error("登录失败")
                    }
                })

            } else {
                message.error('登录失败 ')
            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>Cron Admin</span>
                        <PwaInstaller/>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名!'}],
                                initialValue: 'wc'
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="管理员输入admin, 游客输入guest"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                                initialValue: '123456'
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="管理员输入admin, 游客输入guest"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth'])(Form.create()(Login));