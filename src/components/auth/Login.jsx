/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita'
import tools from 'utils/tools'
import {_get,_post} from "utils/requests";
import md5 from "js-md5";

const FormItem = Form.Item;

class Login extends React.Component {
    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { setAlitaState } = this.props;
                // if (values.userName === 'zxysilent' && values.password === 'zxyslt') setAlitaState({ funcName: 'admin', stateName: 'auth' });
                let data = {
                    num: values.userName,
                    pass: md5(values.password).substr(1, 30)
                };
                _post('http://127.0.0.1:88/api/login',data,res=>{

                    if (res.code == 200) {
                        // {
                        //   "code": 200,
                        //   "msg": "登陆成功",
                        //   "data": "eyJpZCI6MSwibnVtIjoiIiwibmFtZSI6IiIsInJvbGUiOjEwNzQ3OTE0MjQsImV4cCI6MTU4NTgxNzA1MH0=.cyYmSd6gic62GcmlaFI6PjNTDZ8="
                        // }
                        // auth
                        // {
                        //   "code": 200,
                        //   "msg": "信息",
                        //   "data": {
                        //     "id": 1,
                        //     "name": "zxysilent",
                        //     "num": "zxysilent",
                        //     "pass": "3b861abeaa25fba9d03898324463f7",
                        //     "role": 1074791424,
                        //     "email": "zxysilent@foxmail.com",
                        //     "phone": "",
                        //     "ip": "127.0.0.1",
                        //     "ecount": 0,
                        //     "ltime": "2020-04-02T14:44:10+08:00",
                        //     "ctime": "2017-04-05T23:28:35+08:00"
                        //   }
                        // }
                        tools.setToken(res.data);
                        history.push('/app/dashboard/index');
                    } else {
                        alert(res.msg);
                    }
                })
            }else {
                message.error('shibai ')
            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                                initialValue: 'zxysilent'
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                                initialValue: 'zxyslt'
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span >或 现在就去注册!</span>
                                <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth'])(Form.create()(Login));