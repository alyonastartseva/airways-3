import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import { useState } from 'react';

type LoginForm = {
  email: string;
  password: string;
  acceptRules: boolean;
};

const { Title } = Typography;
const { Option } = Select;

const LoginForm = () => {
  const onFinish = (values: LoginForm) => {
    // eslint-disable-next-line no-console
    console.log('log fields', { ...values });
  };

  const [form] = Form.useForm();
  return (
    <Form
      layout="vertical"
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Flex vertical align="center" justify="center">
        <Card style={{ width: '40rem', margin: '1rem' }}>
          <Title style={{ textAlign: 'center' }} level={2}>
            Регистрация
          </Title>
          <Flex
            style={{ marginBottom: '1rem' }}
            vertical
            align="start"
            gap="large"
          >
            <Form.Item
              style={{ width: '100%' }}
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'неправильный email',
                },
                {
                  required: true,
                  message: 'Введите ваш email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              name="password"
              label="Пароль"
              rules={[
                {
                  required: true,
                  message: 'Введите ваш пароль',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Flex>
          <Flex vertical justify="center" align="center">
            <Form.Item>
              <Button
                style={{ background: '#445ebd' }}
                type="primary"
                htmlType="submit"
              >
                Войти
              </Button>
            </Form.Item>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default LoginForm;
