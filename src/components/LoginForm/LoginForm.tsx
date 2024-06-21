import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import s from './LoginForm.module.scss';

type LoginForm = {
  email: string;
  password: string;
  acceptRules: boolean;
};

const { Title, Text } = Typography;
const { Item } = Form;

const LoginForm = () => {
  const navigate = useNavigate();
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
        <Card className={s.loginContainer}>
          <Title className={s.title} level={2}>
            Регистрация
          </Title>
          <Flex vertical align="start" gap="large">
            <Item
              className={s.inputField}
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
            </Item>
            <Item
              className={s.inputField}
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
            </Item>
            <Text className={s.centredText}>
              У вас ещё нет аккаунта?{' '}
              <button
                className={s.navigateBtn}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/sign-up');
                }}
              >
                Зарегистрируйтесь
              </button>{' '}
            </Text>
          </Flex>
          <Flex vertical justify="center" align="center">
            <Item>
              <Button className={s.submitBtn} type="primary" htmlType="submit">
                Войти
              </Button>
            </Item>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default LoginForm;
