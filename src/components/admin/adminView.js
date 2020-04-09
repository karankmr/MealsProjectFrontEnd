import React from "react";
import {Link, useHistory} from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout,Row,Col,Button} from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';
import { PoweroffOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout;

const AdminView=()=>{
    const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
    const history =useHistory();
    const handleLogout=()=>{
        reactLocalStorage.clear();
        history.push('/login')
    }

    return(
            <div className="'adminView'">
            <Layout >
                <Header>Header</Header>

                <Content style={{margin:'100px', fontSize:'30px', boxShadow:'blur'}}>
                    <Row gutter={[24, 24]} justify="space-between" align="bottom">
                        <Col span={24}><Link to='/viewAllUsers/'>
                            <DemoBox value={50}>View All Users</DemoBox>
                        </Link>
                        </Col>
                    </Row>

                    {/*<Row gutter={[24, 24]} justify="space-between" align="bottom">*/}
                    {/*    <Col span={24}><Link to='/createMeals'>*/}
                    {/*        <DemoBox value={50}>Create New Meal</DemoBox>*/}
                    {/*    </Link>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                    <Row gutter={[24, 24]} justify="space-between" align="bottom">
                        <Col span={24}><Link to='/viewAllMeals'>
                            <DemoBox value={50}>View All Meals</DemoBox>
                        </Link>
                        </Col>
                    </Row>

                </Content>
                <Footer className="Footer">
                    <h3>@Calorie Counter</h3>
                    <div style={{position:'absolute',marginLeft:'85%'}}>
                    <Button
                        // type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    </div>
                </Footer>
            </Layout>

            </div>

    )



}
export default AdminView