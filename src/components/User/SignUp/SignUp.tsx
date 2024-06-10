// import { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from 'antd';

const { Title } = Typography;

const optionsSelect = [
  { value: '1', label: 'Как звали вашего первого питона?' },
  { value: '2', label: 'Любовь = ?' },
  { value: '3', label: 'замечательная задача, намного лучше flightSeats' },
];

const SignUp = () => {
  return (
    <Form>
      <Flex vertical align="center" justify="center">
        <Card style={{ width: '40rem' }}>
          <Title style={{ textAlign: 'center' }} level={2}>
            Регистрация
          </Title>
          <Flex
            style={{ marginBottom: '1rem' }}
            vertical
            align="start"
            gap="large"
          >
            <p>Email</p>
            <Input type="email" />
            <p>Секретный вопрос</p>
            <Select
              defaultValue={3}
              style={{ width: '100%' }}
              options={optionsSelect}
            />
            <p>Ответ на секретный вопрос</p>
            <Input />
            <p>введите пароль</p>
            <Input.Password
              style={{ width: '100%' }}
              placeholder="введите пароль"
            />
            <p>повторите пароль</p>
            <Input.Password
              style={{ width: '100%' }}
              placeholder="повторите пароль"
            />
            <Checkbox>
              <p style={{ fontSize: '1em' }}>
                я прочитал(-а) условия пользовательского соглашения и
                согласен(-сна) с ними
              </p>
            </Checkbox>
          </Flex>
          <Flex vertical justify="center" align="center">
            <Button
              style={{ background: '#445ebd' }}
              type="primary"
              size={'large'}
            >
              Зарегистрироваться
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default SignUp;
