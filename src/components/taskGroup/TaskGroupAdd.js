/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table, Icon, Button, Row, Col, Card, Input, Checkbox, Form, Select, message, Radio, InputNumber} from 'antd';
import {_post} from "@/utils/requests";
import tools from "@/utils/tools";


const {TextArea} = Input
const {Option} = Select

class TaskGroupAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                _post('/api/taskGroup/TaskGroupAdd', values, res => {
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
                        label={'分组名称'}
                    >
                        {getFieldDecorator('groupName', {
                            rules: [{required: true, message: '请输入用户名!', whitespace: true}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="分组说明">
                        {getFieldDecorator('description', {
                            rules: [
                                {
                                    required: true, message: '请输入任务说明!',
                                },
                            ],
                        })(<TextArea/>)}
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

TaskGroupAdd = Form.create()(TaskGroupAdd);
export default TaskGroupAdd;