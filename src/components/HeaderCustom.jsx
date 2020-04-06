/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import {Menu, Icon, Layout, Badge, Popover, Button, message} from 'antd';
import {withRouter} from 'react-router-dom';
import {PwaInstaller} from './widget';
import {connectAlita} from 'redux-alita';
import {_post, _get} from "@/utils/requests";
import tools from "@/utils/tools";


const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            visible: false,
        };
    }

    componentDidMount() {

        if (tools.getToken()) {
            _get('/api/user/LoginUser', {}, res => {
                if (res.code == 200) {
                    let data = res.data
                    this.setState({user: data})
                }
            })
        }
    };

    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expireTime');
        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({visible});
    };

    render() {
        const {responsive = {data: {}}, path} = this.props;
        return (
            <Header className="custom-theme header">
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide}/>} trigger="click"
                                 placement="bottomLeft" visible={this.state.visible}
                                 onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="header__trigger custom-trigger"/>
                        </Popover>
                    ) : (
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{lineHeight: '64px', float: 'right'}}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="pwa">
                        <PwaInstaller/>
                    </Menu.Item>

                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像"/><i
                        className="on bottom b-white"/></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:2"><span onClick={()=>message.warning('功能开发中')}>个人信息</span></Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3"><span onClick={()=>message.warning('功能开发中')}>个人设置</span></Menu.Item>
                            <Menu.Item key="setting:4"><span onClick={()=>message.warning('功能开发中')}>系统设置</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <span>你好，{this.state.user.username}</span>
                    {/*<Icon style={{marginLeft:'20px'}} type={'poweroff'}/>*/}
                </Menu>
            </Header>
        )
    }
}

export default withRouter(connectAlita(['responsive'])(HeaderCustom));
