import Footer from '@/components/Footer';
import { register } from '@/services/cookie-shop-admin/api';
import {
    LockOutlined,
    MobileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormText,
    ProFormCheckbox,
} from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import styles from '../Login/index.less';


const Register: React.FC = () => {
    const intl = useIntl();

    const handleSubmit = async (values: API.RegisterParams) => {
        try {
            // 注册
            const { password, password2 } = values;
            if (password != password2) {
                message.error("两次密码不一致，请重新输入");
                return
            }

            const msg = await register({ ...values });
            if (msg.status === 'ok') {
                const defaultRegisterSuccessMessage = intl.formatMessage({
                    id: 'pages.register.success',
                    defaultMessage: '注册成功！',
                });
                message.success(defaultRegisterSuccessMessage);
                // todo 跳转到登录页面
                history.push('/user/login');
                return;
            }
            if (msg.errMessage != '') {
                message.error(msg.errMessage);
                return
              }
            console.log(msg);
            // 如果失败去设置用户错误信息
            message.error("登录失败，请联系管理员");
        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.resigter.failure',
                defaultMessage: '登录失败，请重试！',
            });
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang />}
            </div>
            <div className={styles.content}>
                <LoginForm
                    logo="/logo.png"
                    title="蛋糕商城"
                    subTitle="该商城系统由湖北理工学院计算机李俊君老师研发"
                    initialValues={{
                        asAdmin: false,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                    submitter={{
                        // 配置按钮文本
                        searchConfig: {
                            submitText: '注册',
                        }
                    }}
                >

                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                            id: 'pages.register.username.placeholder',
                            defaultMessage: '输入用户名',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.register.username.required"
                                        defaultMessage="请输入用户名!"
                                    />
                                ),
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                            id: 'pages.register.password.placeholder',
                            defaultMessage: '输入密码',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.register.password.required"
                                        defaultMessage="请输入密码！"
                                    />
                                ),
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password2"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                            id: 'pages.register.password2.placeholder',
                            defaultMessage: '重新输入密码',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.register.password2.required"
                                        defaultMessage="请重新输入密码！"
                                    />
                                ),
                            },
                        ]}
                    />
                    <ProFormText
                        name="name"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                            id: 'pages.register.name.placeholder',
                            defaultMessage: '输入真实姓名',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.register.name.required"
                                        defaultMessage="输入真实姓名!"
                                    />
                                ),
                            },
                        ]}
                    />
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className={styles.prefixIcon} />,
                        }}
                        name="mobile"
                        placeholder={intl.formatMessage({
                            id: 'pages.register.phoneNumber.placeholder',
                            defaultMessage: '手机号',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.register.phoneNumber.required"
                                        defaultMessage="请输入手机号！"
                                    />
                                ),
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: (
                                    <FormattedMessage
                                        id="pages.login.phoneNumber.invalid"
                                        defaultMessage="手机号格式错误！"
                                    />
                                ),
                            },
                        ]}
                    />
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="asAdmin">
                            注册作为管理员
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                            href="/user/login"
                        >
                            已有账号，登录
                        </a>
                    </div>
                </LoginForm>
            </div>
            <Footer />
        </div>
    )
};

export default Register;
