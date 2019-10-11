import React, { Component } from 'react';
import IconFont from '../common/IconFont';
import { Layout, Menu, Badge } from 'antd';
const { Sider } = Layout;

export default class GlobalSider extends Component {

    onMenuClick = e => {
        this.props.history.push(e.key);
    }

    render() {
        const pathname = this.props.location.pathname;
        return (
            <Sider width={210} className="cus-sider" trigger={null} collapsible collapsed={false}>
                <div className="logo">
                    <div className="brand-title">华域安网</div>
                    <img className="brand-img" src={require('../../images/Logo_VLAN_575757.png')} width="76px" alt=""/>
                </div>
                <Menu mode="inline" defaultSelectedKeys={[pathname]} onClick={this.onMenuClick}>
                    <Menu.ItemGroup title="设备组列表">
                        <Menu.Item key="/">
                            <IconFont type="vc-zu" />
                            <span>全部</span>
                        </Menu.Item>
                        <Menu.Item key="/groups/myGroups">
                            <IconFont type="vc-zu" />
                            <span>我创建的组</span>
                        </Menu.Item>
                        <Menu.Item key="/groups/otherGroups">
                            <IconFont type="vc-zu" />
                            <span>其他人创建的组</span>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="我的信息">
                        <Menu.Item key="/4">
                            <IconFont type="vc-gerenxinxi" />
                            <span>个人信息</span>
                        </Menu.Item>
                        <Menu.Item key="/5">
                            <IconFont type="vc-haoyou" />
                            <span>我的好友</span>
                        </Menu.Item>
                        <Menu.Item key="/6">
                            <IconFont type="vc-Icon-shebeixinxi" />
                            <span>我的设备</span>
                        </Menu.Item>
                        <Menu.Item key="/7">
                            <IconFont type="vc-denglurizhi-" />
                            <span>最近登录</span>
                        </Menu.Item>
                        <Menu.Item key="/8">
                            <IconFont type="vc-xiaoxi" />
                            <span>消息管理<Badge count={25} /></span>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </Sider>
        )
    }
}
