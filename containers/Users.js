import * as React from 'react';
import { Table } from 'antd';
import { usersUrl } from '../constants/url';

class Users extends React.Component {
  state = {
    data: []
  };
  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '住址',
      dataIndex: 'dorm',
      key: 'dorm'
    },
    {
      title: '学号',
      dataIndex: 'student_id',
      key: 'stdid'
    },
    {
      title: '学院',
      dataIndex: 'college',
      key: 'college'
    },
    {
      title: '积分',
      dataIndex: 'bonus',
      key: 'bonus'
    }
  ];

  componentDidMount() {
    fetch(usersUrl)
      .then(res => res.json())
      .then(res => {
        const data = res.data.filter(user => user.name);
        this.setState({ data });
      });
  }

  render() {
    return <Table dataSource={this.state.data} columns={this.columns} />;
  }
}

export default Users;
