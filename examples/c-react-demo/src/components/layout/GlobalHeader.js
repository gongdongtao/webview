import React, { Component } from 'react';
import IconFont from '../common/IconFont';
import HeaderSearch from '../HeaderSearh';
import { Button, Divider, Avatar, Dropdown, Menu, Layout } from 'antd';
const { Header } = Layout;

export default class GlobalHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historys: []
        };
    }

    handleMenuClick = e => {
        switch (e.key) {
            case '4':
                this.props.history.push('login');
                break;
            default:
                break;
        }
    }

    goBack = () => {
        this.setState({historys: [...this.state.historys, this.props.location.pathname]});
        this.props.history.goBack();
    }

    goForword = () => {
        let arrs = [...this.state.historys];
        let pathname = arrs.pop();
        this.setState({historys: arrs});
        this.props.history.push(pathname);
    }

    render() {
        const { historys } = this.state;
        const more = (
            <Menu className="cus-header-menu" onClick={this.handleMenuClick}>
                <Menu.Item className="cus-menu-item" key="0">
                    <IconFont type="vc-shezhi" />
                    <div>偏好设置</div>
                </Menu.Item>
                <Menu.Item className="cus-menu-item" key="1">
                    <IconFont type="vc-yongdianzhenduan" />
                    <div>诊断工具</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <IconFont type="vc-Icon-shebeixinxi" />当前设备信息
                </Menu.Item>
                <Menu.Item key="3">
                    <IconFont type="vc-yunduangengxin" />检查更新
                </Menu.Item>
                <Menu.Item key="4">
                    <IconFont type="vc-zhuxiao" />注销
                </Menu.Item>
                <Menu.Item key="5">
                    <IconFont type="vc-tuichu" />退出客户端
                </Menu.Item>
                <Menu.Item key="6">
                    <IconFont type="vc-guanyu" />关于
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className="global-header">
                <div className="header-left">
                    {this.props.left === null ? null :
                        <>
                            <Button type="link" onClick={this.goBack}><IconFont type="vc-left" /></Button>
                            <Button type="link" disabled={historys.length === 0} onClick={this.goForword}><IconFont type="vc-right" /></Button>
                            <HeaderSearch />
                        </>
                    }
                </div>
                <div className="header-right">
                    <div className="user-info" onClick={this.props.onProfileClick}>
                        <Avatar src="https://eccqa.weadmin.com/itsm/ecc/static/media/Tulips.fafa5efe.jpg" />
                        <span className="user-text">点击登录</span>
                    </div>
                    <Button type="link"><IconFont type="vc-pifu" /></Button>
                    <Dropdown overlay={more} trigger={['click']} placement="bottomCenter">
                        <Button type="link"><IconFont type="vc-iconmore" /></Button>
                    </Dropdown>
                    <Divider type="vertical" style={{height: '1.3em'}} />
                    <Button type="link"><IconFont type="vc-zuixiaohua" /></Button>
                    <Button type="link"><IconFont type="vc-zuidahua" /></Button>
                    <Button type="link"><IconFont type="vc-guanbi" /></Button>
                </div>
            </Header>
        )
    }
}
