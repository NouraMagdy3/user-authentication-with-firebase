import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginAccountSchema } from '../../../utils/validation';
import { logInWithEmailAndPassword, signInWithGoogle } from '../../../utils/firebase/authHelper';
import { Form, Input, Button, Checkbox, Typography, Row, Col, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//images
import loginImage from '../../../assets/images/6532.jpg';
//style
import './LoginForm.css';

//constants
const { Text, Title } = Typography;

const LoginForm = () => {
    //hooks
    const { control, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginAccountSchema)
    });
    const wa = watch();
    console.log(wa);

    //functions
    const submit = React.useCallback(data => {
        console.log(data);
        logInWithEmailAndPassword(data.email, data.password);
    }, []);

    return (
        <div className='login-page'>
            <Row>
                <Col span={24} lg={12}>
                    <Image
                        preview={false}
                        width='100%'
                        src={loginImage}
                    />
                </Col>
                <Col span={24} lg={12}>
                    <div className='login-side'>
                        <Title level={3}>Get started!</Title>
                        <Form className='login-form' onSubmitCapture={handleSubmit(submit)}>
                            <div className='input-cell'>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Username"
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.username &&
                                    <Text type="danger">
                                        {errors.username?.message}
                                    </Text>
                                }
                            </div>
                            <div className='input-cell'>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Password"
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.password &&
                                    <Text type="danger">
                                        {errors.password?.message}
                                    </Text>
                                }
                            </div>
                            <div className='d-flex'>
                            <Controller
                                name="checkbox"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                    >
                                        Remember me
                                    </Checkbox>
                                )}
                            />
                            <a className="login-form-forgot" href="/">
                                Forgot password
                            </a>
                            </div>
                            <Button htmlType="submit" className="login-form-button" block>
                                Log in
                            </Button>
                            <Button className="google-button"
                                onClick={() => signInWithGoogle()} block>
                                Login with Google
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LoginForm;