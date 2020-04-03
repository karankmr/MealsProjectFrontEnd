import React from "react";
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout,Row,Col} from 'antd';
const { Header, Footer, Content } = Layout;

const AdminView=()=>{
    const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

    return(
        <div >
            <Layout className='adminView'>
                <Header>Header</Header>

                <Content style={{margin:'100px', fontSize:'30px', boxShadow:'blur'}}>
                    <Row gutter={[24, 24]} justify="space-between" align="bottom">
                        <Col span={24}><Link to='/viewAllUsers/'>
                            <DemoBox value={50}>View All Users</DemoBox>
                        </Link>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} justify="space-between" align="bottom">
                        <Col span={24}><Link to='/createMeals'>
                            <DemoBox value={50}>Create New Meal</DemoBox>
                        </Link>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} justify="space-between" align="bottom">
                        <Col span={24}><Link to='/viewAllMeals'>
                            <DemoBox value={50}>View All Meals</DemoBox>
                        </Link>
                        </Col>
                    </Row>

                </Content>
                <Footer>@Calorie Counter</Footer>
            </Layout>
        </div>)



}
export default AdminView