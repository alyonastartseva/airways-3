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
import { useNavigate } from 'react-router-dom';

type registerForm = {
  email: string;
  password: string;
  acceptRules: boolean;
};

const { Title } = Typography;
const { Option } = Select;

const SignUp = () => {
  const [secretQuestion, setSecretQuestion] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');

  const onFinish = (values: registerForm) => {
    // eslint-disable-next-line no-console
    console.log('log fields', { ...values, secretAnswer, secretQuestion });
  };

  const [form] = Form.useForm();
  const navigate = useNavigate();

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
              name="secretQuestion"
              label="Секретный вопрос"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, выберите секретный вопрос!',
                },
              ]}
            >
              <Select
                placeholder="Выберите вопрос"
                onChange={setSecretQuestion}
              >
                <Option value="1">Как звали вашего первого питона?</Option>
                <Option value="2">Любовь = ?</Option>
                <Option value="3">
                  Ваш первый учитель?,Замечательная задача, намного лучше
                  flightSeats.
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              name="secretAnswer"
              label="Ответ на секретный вопрос"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите ответ на секретный вопрос!',
                },
              ]}
            >
              <Input onChange={(e) => setSecretAnswer(e.target.value)} />
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              name="password"
              label="Password"
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

            <Form.Item
              style={{ width: '100%' }}
              name="confirm"
              label="Потвердите пароль"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста потвердите пароль',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="acceptRules"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            'для регистрации вам нужно согласиться с условиями пользовательского соглашения'
                          )
                        ),
                },
              ]}
            >
              <Checkbox>
                я прочитал(-а){' '}
                <button
                  style={{ border: 'none' }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/sign-in');
                  }}
                >
                  условия пользовательского соглашения
                </button>{' '}
                и согласен(-сна) с ними
              </Checkbox>
            </Form.Item>
          </Flex>
          <Flex vertical justify="center" align="center">
            <Form.Item>
              <Button
                style={{ background: '#445ebd' }}
                type="primary"
                htmlType="submit"
              >
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default SignUp;
