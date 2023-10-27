import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, Skeleton, Space} from 'antd';
import '../CSS/mytodolist.css';
import {useLocation} from "react-router-dom";

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Sider = () => {
    const {state} = useLocation()
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);
    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);

                window.dispatchEvent(new Event('resize'));
            });
    };
    const loadMore =
        !initLoading && !loading ? (
            <div className={"sider-sign"}
                 style={{
                     textAlign: 'left',
                     marginTop: 12,
                     height: 32,
                     lineHeight: '20px',

                 }}
            >
                <Button className='loadbutton' onClick={onLoadMore} type="primary" ghost>loading more</Button>
            </div>
        ) : null;
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const changeUser = () => {
        const index = UserList.indexOf(user);
        setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
        setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
    };
    const changeGap = () => {
        const index = GapList.indexOf(gap);
        setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
    };
    const username = state.credentials.username;
    return (
        <div>
            <>
                <Space>
                    <div className="head1">
                        <Avatar
                            style={{
                                backgroundColor: color,
                                verticalAlign: 'middle',
                            }}
                            size="large"
                            gap={gap}
                        >
                            {user}
                        </Avatar>
                    </div>
                    <div className="username"> {username}</div>

                </Space>
            </>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item

                    >

                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar className='head' shape="square" src={item.picture.large}/>}
                                title={<a href="https://ant.design">{item.name?.last}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />

                        </Skeleton>
                    </List.Item>

                )}

            />
        </div>
    );
};
export default Sider;