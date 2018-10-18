import * as React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sider extends React.Component {
  state = {
    activeId: ''
  };

  handleClick = ({ item, key }) => {
    const activeId = key;
    this.props.setActiveId(activeId);
    this.setState({ activeId });
  };

  render() {
    const { menuItems } = this.props;
    return (
      <Menu
        onClick={this.handleClick}
        theme="dark"
        defaultSelectedKeys={['0']}
        mode="inline"
        defaultOpenKeys={['sub1']}
      >
        {menuItems.map(({ key, title, type }) => {
          return (
            <Menu.Item key={key} data-id={key}>
              <Icon type={type} />
              <span>{title}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

export default Sider;
