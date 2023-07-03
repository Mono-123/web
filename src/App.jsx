import { UserOutlined,BarChartOutlined } from '@ant-design/icons'
import { Layout, Menu, Typography } from 'antd';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'

export default () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const isHomePage = pathname === '/'

    return (
        <Layout>
            <Layout.Header>
                <Link style={{ color: 'white' }} to={'/'}>
                    HomePage
                </Link>
            </Layout.Header>

            <Layout hasSider={true} style={{ height: 'calc( 100vh - 132px )' }}>
                <Layout.Sider style={{ background: 'white' }}>
                    <Menu
                        defaultSelectedKeys={[pathname.split('/')[1]]}
                        items={[
                            {
                                icon: <UserOutlined />,
                                label: 'Student',
                                title: 'Student',
                                key: 'student',
                                onClick: () => navigate('/student')
                            },
                        ]}
                    />
                    <Menu
                        defaultSelectedKeys={[pathname.split('/')[1]]}
                        items={[
                            {
                                icon: <BarChartOutlined />,
                                label: 'Score',
                                title: 'Score',
                                key: 'score',
                                onClick: () => navigate('/score')
                            },
                        ]}
                    />
                </Layout.Sider>
                <Layout.Content style={{ padding: '10px 20px' }}>
                    {isHomePage && <Typography.Title>欢迎</Typography.Title>}

                    <Outlet />
                </Layout.Content>
            </Layout>

            <Layout.Footer>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    2023
                </div>
            </Layout.Footer>
        </Layout>
    )
}