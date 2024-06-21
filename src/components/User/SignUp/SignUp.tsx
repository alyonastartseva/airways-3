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
import { useNavigate } from 'react-router-dom';

import { secretQuestions } from '@/constants';

import s from './SignUp.module.scss';

type registerForm = {
  email: string;
  password: string;
  acceptRules: boolean;
};

const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;

const SignUp = () => {
  const onFinish = (values: registerForm) => {
    // eslint-disable-next-line no-console
    console.log('log fields', { ...values });
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
        <Card className={s.formContainer}>
          <Title className={s.title} level={2}>
            Регистрация
          </Title>
          <Flex vertical gap={'1rem'}>
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
              name="secretQuestion"
              label="Секретный вопрос"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, выберите секретный вопрос!',
                },
              ]}
            >
              <Select placeholder="Выберите вопрос">
                {secretQuestions.map(({ value, question }) => (
                  <Option key={value} value={value}>
                    {question}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              className={s.inputField}
              name="secretAnswer"
              label="Ответ на секретный вопрос"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите ответ на секретный вопрос!',
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

            <Item
              className={s.inputField}
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
            </Item>
            <Item
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
              <Checkbox className={s.centredText}>
                я прочитал(-а){' '}
                <button
                  className={s.navigateBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/sign-in');
                  }}
                >
                  условия пользовательского соглашения
                </button>{' '}
                и согласен(-сна) с ними
              </Checkbox>
            </Item>
          </Flex>
          <Flex vertical justify="center" align="center">
            <Item>
              <Button className={s.submitBtn} type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            </Item>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default SignUp;
