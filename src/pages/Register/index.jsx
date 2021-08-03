import { Form, Input, Select, Button, Checkbox, notification } from "antd";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import history from '../../utils/history';

import { registerAction } from '../../redux/actions';

function RegisterPage({ userList, register }) {
  const [registerForm] = Form.useForm();

  function handleSubmit(values) {
    const userInfo = userList.find((user) => {
      return user.email === values.email;
    })
    if (userInfo) {
      registerForm.setFields([
        {
          name: 'email',
          errors: ['Email đã tồn tại!']
        }
      ]);
    } else {
      register({
        id: uuidv4(),
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        role: 'user',
      });
      notification.success({
        message: 'Đăng ký thành công!',
      });
      history.push('/login');
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-title">
          <h2>Register</h2>
        </div>
        <Form
          form={registerForm}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Bạn chưa nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Bạn chưa nhập giới tính!" }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Bạn chưa nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="prePassword"
            rules={[
              { required: true, message: 'Bạn chưa xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu xác nhận không đúng!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
          >
            <Checkbox>Đồng ý với các điều khoản</Checkbox>
          </Form.Item>

          <div style={{ display: 'inline-block', marginBottom: 16 }}>
            Bạn đã có tài khoản?&nbsp;
            <Link to="/login">
              Đăng nhập
            </Link>
          </div>

          <Button type="primary" htmlType="submit" block>
            Đăng kí
          </Button>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userList } = state.userReducer;
  return {
    userList: userList,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (params) => dispatch(registerAction(params)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
