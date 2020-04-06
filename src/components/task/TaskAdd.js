/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, Input, Checkbox, Form, Select, message, Radio, InputNumber} from 'antd';
import {_get, _post} from "@/utils/requests";
import tools from "@/utils/tools";


const {TextArea} = Input
const {Option} = Select

class TaskAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList:[]
        };
    }

    componentDidMount() {
        _get('/api/taskGroup/TaskGroupList', {}, res => {
            if (res.code == 200) {
                this.setState({groupList: res.data})
            } else {
                message.error(res.msg)
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                _post('/api/task/TaskAdd', values, res => {
                    if (res.code == 200) {
                        this.props.onCancel()
                        message.success("创建成功", 2, () => window.location.reload())
                    } else {
                        message.error(res.msg)
                    }
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {groupList} = this.state
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
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
                        label={'任务名称'}
                    >
                        {getFieldDecorator('taskName', {
                            rules: [{required: true, message: '请输入用户名!', whitespace: true}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="任务说明">
                        {getFieldDecorator('description', {
                        })(<TextArea/>)}
                    </Form.Item>
                    <Form.Item label="分组">
                        {getFieldDecorator('groupId', {
                            rules: [
                                {
                                    required: true, message: '请输入分组!',
                                },
                            ],
                        })(
                            <Select placeholder={"请选择"}>
                                {groupList.map(g=><Option key={g.id} value={g.id}>{g.groupName}</Option> )}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="单实例">
                        {getFieldDecorator('concurrent', {
                            rules: [
                                {
                                    required: true, message: '请输入邮箱!',
                                },
                            ],
                            initialValue: 0,
                        })(
                            <Radio.Group>
                                <Radio value={0}>是</Radio>
                                <Radio value={1}>否</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                    <Form.Item label="Cron表达式" hasFeedback>
                        {getFieldDecorator('cronSpec', {
                            rules: [
                                {
                                    required: true, message: '请再次填写密码!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="命令脚本">
                        {getFieldDecorator('command', {
                            rules: [
                                {
                                    required: true, message: '请输入任务说明!',
                                },
                            ],
                        })(<TextArea/>)}
                    </Form.Item>
                    <Form.Item label="超时设置(秒)" hasFeedback>
                        {getFieldDecorator('timeout', {
                            rules: [
                                {
                                    required: true, message: '请再次填写密码!',
                                },
                            ],
                            initialValue: 0,
                        })(<InputNumber/>)}

                    </Form.Item>
                    <Form.Item label="邮件通知">
                        {getFieldDecorator('notify', {
                            rules: [
                                {
                                    required: true, message: '请输入邮箱!',
                                },
                            ],
                            initialValue: 0,
                        })(
                            <Radio.Group>
                                <Radio value={0}>不通知</Radio>
                                <Radio value={1}>仅执行失败通知</Radio>
                                <Radio value={2}>执行结束通知</Radio>
                            </Radio.Group>,
                        )}
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

TaskAdd = Form.create()(TaskAdd);
export default TaskAdd;