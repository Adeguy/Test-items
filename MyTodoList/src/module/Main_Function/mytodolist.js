import React from 'react';
import {Calendar, Modal, DatePicker, Select, Input, Button, Badge, Space} from 'antd';
import {CloseOutlined, PlusSquareOutlined, PoweroffOutlined} from '@ant-design/icons';
import '../CSS/style.css'
import axios from "axios";

const {Option} = Select;

class Calendar_Tasks extends React.Component {
    state = {
        showModal: false, // 表示模态框是否可见
        selectedDate: '2023-10-26', // 存储从日期选择器中选择的日期
        priority: '', // 存储选择的优先级
        todoText: '', // 存储输入的待办事项文本
        selectedData_Picker: null,
        events: '', // 存储事件与其对应的日期
        deleteEvents: ''

    };


    componentDidMount(value) {
        const token = localStorage.getItem('token');
        const {selectedDate, priority, todoText, events} = this.state;
        const updatedEvents = {...events};//拷贝

        axios.get('http://localhost:5000/getEvent', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                let updatedEvents = {...this.state.events}; // 创建事件的副本以避免直接更改state
                response.data.forEach((event) => {
                    let eventDate = event.date;
                    console.log(eventDate.slice(0, 10))
                    let newEvent = {
                        id: event.id,
                        date: eventDate.slice(0, 10),
                        content: event.text,
                        priority: event.priority,

                    }
                    console.log(newEvent)
                    updatedEvents[eventDate.slice(0, 10)] = updatedEvents[eventDate.slice(0, 10)] || [];//没有的进行更新
                    updatedEvents[eventDate.slice(0, 10)].push(newEvent);//push添加
                });
                this.setState({events: updatedEvents});

            })
            .catch((error) => {
                console.log(error);
            })


    }

    showModalHandler = () => {
        this.setState({showModal: true, selectedDate: this.state.selectedDatePicker});
    };
    // 处理模态框取消按钮的函数
    handleModalCancel = () => {
        this.setState({
            showModal: false,
            selectedDate: '2023-10-26',
            selectedDate_Picker: '',
            priority: '',
            todoText: '',
        });
    };
    // 处理模态框确认按钮的函数
    handleModalFinish = () => {
        const token = localStorage.getItem('token');
        //调用数据
        const {selectedDate, priority, todoText, events,new_Event} = this.state;
        // 验证是否填写了所有必填字段
        if (!selectedDate || !priority || !todoText) {
            Modal.warning({
                title: '请补充完整待办事项',
                content: '日期、优先级和待办事项为必填项，请补充完整后再提交。',
            });
        }
        //格式转换
        const date = selectedDate.format('YYYY-MM-DD');
        // 将新的事件对象添加到对应日期的事件列表中
        const updatedEvents = {...events};//拷贝
        updatedEvents[date] = updatedEvents[date] || [];//没有的进行更新
        const newEvent = {//创建新事件
            id: Date.now(),
            date,
            content: todoText,
            priority,

        };
        const new_event=newEvent
        console.log('newevent:',newEvent)
        updatedEvents[date].push(new_event);//push添加
        axios.post('http://localhost:5000/newEvent',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body:new_event
            }
        )

            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            })



        // 关闭模态框，并重置相关状态
        this.setState({
            events: updatedEvents,
            showModal: false,
            selectedDate: '2023-10-26',
            selectedDate_Picker: '',
            priority: '',
            todoText: '',
        });

    };
    // 点击删除按钮的函数
    handleDelete = (date, id) => {
        const self = this;
        const {events} = this.state;
        const updatedEvents = {...events}; // 拷贝 events 对象
        console.log(events)
        //查找相应的事件下标
        const index = updatedEvents[date].findIndex((event) => event.id === id);

        // 从 updatedEvents 中删除相应的事件，并将其赋值给 deletedEvent
        const deletedEvent = updatedEvents[date].splice(index, 1)[0];

        // 将 deletedEvent 添加到 deleteEvents 对象（属性值为数组）的相应日期中
        const updatedDeleteEvents = {...this.state.deleteEvents};
        if (!updatedDeleteEvents[date]) {
            updatedDeleteEvents[date] = [];
        }
        updatedDeleteEvents[date].push(deletedEvent);
        console.log('deletedEvent:',deletedEvent)
        axios.post('http://localhost:5000/delete', deletedEvent)
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            })
        // 更新 deleteEvents 和 events
        this.setState({deleteEvents: updatedDeleteEvents, events: updatedEvents});
    };
    // 渲染日期单元格的函数
    dateCellRender = (value) => {
        const {events} = this.state;
        // 格式化日期
        const date = value.format('YYYY-MM-DD');

        // 获取该日期的事件列表，如果不存在则为空数组
        const content = events[date] || [];
        return (
            <ul className="events">
                {/* 遍历事件列表，渲染每个事件 */}
                {content.map((event) => (

                    <span key={event.id}>
                        {/* 使用Badge组件显示事件的优先级和内容 */}
                        <link rel="stylesheet" type="text/css" href="../CSS/style.css"/>
            <Space.Compact className="text">
              <Badge status={event.priority}/> {event.content}
            </Space.Compact>
                        {/* 添加删除按钮 */}
                        <Button
                            type="link"
                            className="delete"
                            onClick={() => this.handleDelete(date, event.id)}
                        >
              <CloseOutlined/>
            </Button>
            <br/>
          </span>
                ))}
            </ul>
        );
    };
    //新功能：点击日历即可进行添加的填选
    handleDateSelect = (date) => {

        const {events} = this.state;
        console.log(events)
        this.setState({
            selectedDatePicker: date,
        });
    };

    //模态框渲染,版本更新按钮形式
    render() {
        const {showModal, selectedDate, priority, todoText, selectedDatePicker} = this.state;
        return (

            <div className='container1'>

                {/*按钮位置*/}
                <div style={{position: 'absolute', top: '66px', right: '312px'}}>

                    <Button
                        className="addButton"
                        type="primary"
                        size='200px'
                        onClick={this.showModalHandler}
                    >
                        <PlusSquareOutlined/>
                        Add a new to-do item
                    </Button>

                    <Modal
                        title="Add A New To-do Item"
                        open={showModal}
                        onCancel={this.handleModalCancel}
                        onOk={this.handleModalFinish}
                    >
                        <DatePicker
                            defaultValue={selectedDatePicker}//默认显示点击日期后生成日期
                            value={selectedDate}//当selectedDate有值传入时才改变
                            onChange={(date) => this.setState({selectedDate: date})}//导出选择的日期
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                        <Select
                            placeholder="选择优先级"
                            value={priority}
                            onChange={(value) => this.setState({priority: value})}
                            style={{marginBottom: '10px', width: '100%'}}
                        >
                            <Option value="error">高</Option>
                            <Option value="warning">中</Option>
                            <Option value="success">低</Option>
                        </Select>
                        <Input
                            value={todoText}
                            onChange={(e) => this.setState({todoText: e.target.value})}
                            placeholder="输入待办事项"
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                    </Modal>

                </div>
                <Calendar onSelect={this.handleDateSelect} dateCellRender={this.dateCellRender}/>
            </div>
        );
    }
}

export default Calendar_Tasks;
