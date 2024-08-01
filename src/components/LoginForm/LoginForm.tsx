import { Button, Card, Flex, Form, Input, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useLazyGetAccessTokenQuery } from '@/store/services';
import { SpinnerBlock } from '@/common';
import { IError } from '@/interfaces';

import s from './LoginForm.module.scss';

type LoginForm = {
  username: string;
  password: string;
  acceptRules: boolean;
};

const { Title, Text } = Typography;
const { Item } = Form;

const LoginForm = () => {
  const navigate = useNavigate();
  const [trigger, { isLoading }] = useLazyGetAccessTokenQuery();
  const [errorData, setErrorMessage] = useState<IError | null>(null);
  const onFinish = async (values: LoginForm) => {
    try {
      const resAuth = await trigger(values).unwrap();
      localStorage.setItem('adminToken', resAuth.access_token);
      localStorage.setItem('refreshToken', resAuth.refresh_token);
      navigate('/');
    } catch (error) {
      const typedError = error as IError;
      setErrorMessage(typedError);
    }
  };
  const [form] = Form.useForm();

  if (isLoading) {
    return <SpinnerBlock />;
  }

  const errorMessage = errorData ? (
    <Alert
      type="error"
      message={`Error: ${errorData.status}`}
      description={errorData.data.error_description}
      showIcon
    />
  ) : null;

  return (
    <>
      {errorMessage}
      <Form
        layout="vertical"
        form={form}
        name="authorization"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Flex vertical align="center" justify="center">
          <Card className={s.loginContainer}>
            <Title className={s.title} level={2}>
              Авторизация
            </Title>
            <Flex vertical align="start" gap="large">
              <Item
                className={s.inputField}
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: 'Введите ваш Username',
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
                <Button
                  className={s.submitBtn}
                  type="primary"
                  htmlType="submit"
                >
                  Войти
                </Button>
              </Item>
            </Flex>
          </Card>
        </Flex>
      </Form>
    </>
  );
};

export default LoginForm;
