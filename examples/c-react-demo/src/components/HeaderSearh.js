import React, { Component } from 'react';
import IconFont from '../components/common/IconFont';
import { Input } from 'antd';

export default class HeaderSearh extends Component {
    render() {
        return (
            <Input className="vcc-search" placeholder="搜索设备组" prefix={<IconFont type="vc-search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
        )
    }
}
