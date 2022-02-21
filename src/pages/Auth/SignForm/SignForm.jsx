import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignAccountSchema } from '../../../utils/validation';
import { signInWithGoogle, registerWithEmailAndPassword } from '../../../utils/firebase/authHelper';
import { Form, Input, Button, Checkbox, Select, Typography, Row, Col, Image } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
//images
import signImage from '../../../assets/images/6532.jpg';
//style
import './SignForm.css';
import { object } from 'yup';

//constants
const { Text, Title } = Typography;
const { Option } = Select;


const SignForm = () => {
    //hooks
    const { control, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignAccountSchema)
    });

    //functions
    const currentValues = watch();
    console.log(currentValues);

    const submit = React.useCallback(data => {
        console.log(data);
        registerWithEmailAndPassword(data.name, data.email, data.password);
    }, []);

    const prefixSelector = (
        <Controller
            name="countryKey"
            control={control}
            render={({ field }) => (
                <Select {...field}>
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                    <Option value="86">+972</Option>
                </Select>
            )}
        />
    );

    return (
        <div className='sign-page'>
            <Row>
                <Col span={24} lg={12}>
                    <Image
                        preview={false}
                        width='100%'
                        src={signImage}
                    />
                </Col>
                <Col span={24} lg={12}>
                    <div className='sign-side'>
                        <Title level={3}>Sign Up Now!</Title>
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
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="email"
                                            prefix={<MailOutlined className="site-form-item-icon" />}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.email &&
                                    <Text type="danger">
                                        {errors.email?.message}
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
                            <div className='input-cell'>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Confirm Password"
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.confirmPassword &&
                                    <Text type="danger">
                                        {errors.confirmPassword?.message}
                                    </Text>
                                }
                            </div>
                            <div className='input-cell input-cell-phone'>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Phone Number"
                                            addonBefore={prefixSelector}
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.phoneNumber &&
                                    <Text type="danger">
                                        {errors.phoneNumber?.message}
                                    </Text>
                                }
                            </div>
                            <div className='input-cell'>
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Country"
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                                            {...field}
                                        >
                                            <Option value="palestine">Palestine</Option>
                                            <Option value="egypt">Egypt</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    )}
                                />
                                {errors.country &&
                                    <Text type="danger">
                                        {errors.country?.message}
                                    </Text>
                                }
                            </div>
                            <div className='input-cell'>
                                <Controller
                                    name="agreement"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                        >
                                            I have accept the agreement
                                        </Checkbox>
                                    )}
                                />
                                {errors.agreement &&
                                    <Text type="danger">
                                        {errors.agreement?.message}
                                    </Text>
                                }
                            </div>
                            <Button htmlType="submit" className="sign-form-button" block>
                                Sign Up
                            </Button>
                            <Button className="google-button"
                                onClick={() => signInWithGoogle()} block>
                                Sign Up with Google
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SignForm;