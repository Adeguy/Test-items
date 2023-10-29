import React, { Component } from 'react';
import { Avatar, Button, List, Skeleton, } from 'antd';
import '../CSS/style.css';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

class Sider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            loading: false,
            data: [],
            list: [],
            user: UserList[0],
            color: ColorList[0],
            gap: GapList[0],
        };
    }

    componentDidMount() {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    initLoading: false,
                    data: res.results,
                    list: res.results,
                });
            });
    }

    onLoadMore = () => {
        const { data, list } = this.state;
        this.setState({
            loading: true,
            list: list.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                }))
            ),
        });
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                this.setState({
                    data: newData,
                    list: newData,
                    loading: false,
                });
                window.dispatchEvent(new Event('resize'));
            });
    };



    render() {
        const { initLoading, loading, list,} = this.state;

        const loadMore =
            !initLoading && !loading ? (
                <div
                    className={'sider-sign'}
                    style={{
                        textAlign: 'left',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '20px',
                    }}
                >
                    <Button className='loadbutton' onClick={this.onLoadMore} type='primary' ghost>
                        loading more
                    </Button>
                </div>
            ) : null;

        return (
            <div>
                <List
                    className='demo-loadmore-list'
                    loading={initLoading}
                    itemLayout='horizontal'
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar className='head' shape='square' src={item.picture.large} />}
                                    title={<a href='https://ant.design'>{item.name?.last}</a>}
                                    description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Sider;