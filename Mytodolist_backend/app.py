import json

import config
from flask import Flask, render_template, request, url_for, redirect, g, session, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask.views import MethodView
from exts import db, cors
from flask_cors import CORS
from models import td_events, td_user, temp_id

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from base64 import b64decode
# 创建数据库实例对象
# from blueprints.login import bp as login_bp  #导入蓝图
# from blueprints.mytodolist import bp as mytodolist_bp  #导入蓝图
# from models import User  #创建表相关包
# from flask_migrate import Migrate   #创建表相关包
app = Flask(__name__)  # 创建应用实例对象
app.config.from_object(config)  # 绑定配置文件
db.init_app(app)  # 将数据库实例与应用实例对象关联
cors.init_app(app)  # 实例对象跨域允许
app.config['SECRET_KEY'] = 'wxgwxgwxgwxg'  # 安全key
s = Serializer(app.config['SECRET_KEY'], 60 * 60 * 24)  # 令牌在一天后过期
# migrate=Migrate(app,db)#创建表到相关实例   如要创建，接下来应该执行指令
# app.register_blueprint(login_bp)  # 对蓝图进行关联
# app.register_blueprint(mytodolist_bp)  # 对蓝图进行关联
def decrypt(encrypted_data):
    key = b"wxgwxgwxgwxgwxgwxgwx_32bytes_key"  # 密钥 需要和前端相同
    print(key)
    encrypted_str = encrypted_data['encrypted']  # 提取来自encrypted_data字典的加密文本
    print(encrypted_str)
    # 密文需要是 bytes 类型，这里先从 base64 格式解码
    encrypted_data_bytes = b64decode(encrypted_str)
    # 创建一个新的解密器
    cipher = AES.new(key, AES.MODE_ECB)
    # 对密文进行解密后，然后去掉补位
    data_str = unpad(cipher.decrypt(encrypted_data_bytes), AES.block_size).decode('utf-8')
    print(type(data_str))
    data = json.loads(data_str)
    return data

@app.route('/')
def hello_world():
    return 'hello world'


@app.route('/register', methods=['POST', 'GET'])  # 注册
def res():
    encrypted_data = request.get_json()
    data=decrypt(encrypted_data)
    user_judge = td_user.query.filter_by(user=data['username']).first()
    if user_judge is None:
        user = td_user(user=data['username'], password=data['password'])  # 编辑数据
        token = s.dumps({'username': data['username']}).decode('utf-8')
        db.session.add(user)  # 导入数据
        db.session.commit()  # 提交数据

        return jsonify({'token': token}), 200

    else:
        return jsonify({'message': 'err'}), 401


@app.route('/login', methods=['POST', 'GET'])  # 登录
def log():
    encrypted_data = request.get_json()
    data = decrypt(encrypted_data)
    user_judge = td_user.query.filter_by(user=data['username']).first()  # 查找对应数据用户
    if user_judge is None or user_judge.password != data['password']:  # 进行逻辑判断
        return 'err'
    token = s.dumps({'username': data['username']}).decode('utf-8')  # 将用户名加密
    return jsonify({'token': token}), 200  # 返回JSON文件


@app.route('/getEvent', methods=['POST', 'GET'])  # 发送数据库信息
def get_event():
    header = request.headers.get('Authorization', '').split()  # headers 中查找一个名为 ‘Authorization’ 的头部字段,.split()返回列表
    if len(header) != 2:  # 第一个数据是Authorization，第二个数据是token内容
        return jsonify({'message': 'token无效！'}), 401
    token = header[1]  # 第二个数据是token内容
    try:
        data = s.loads(token)
    except:
        return jsonify({'message': 'token无效！'}), 401
    user_find = td_user.query.filter_by(user=data['username']).first()  # 根据token找到对应的用户
    events = td_events.query.filter_by(user_id=user_find.id).all()  # 根据拿到的user_id获得所有的事件
    print(events)
    users_dict_list = []  # 将数据转成一个字典
    for event in events:
        if event.isdelete == 1:
            print(event.id)
            users_dict_list.append({
                'id': event.event_id,
                'date': event.date.isoformat(),  # “YYYY-MM-DDTHH:MM:SS.ssssss”
                'priority': event.priority,
                'text': event.text,
            })
    return jsonify(users_dict_list)


@app.route('/delete', methods=['POST', 'GET'])  # 删除
def delete_event():
    data = request.get_json()  # 这里的data是一个事件的内容
    print(data['id'])
    event = td_events.query.filter_by(event_id=data['id']).first()
    print('delete', event)
    if event is None:
        return jsonify({'message': 'not find Event'}), 401
    else:
        event.isdelete = 0
        db.session.commit()
        return jsonify({'message': 'delete success！'}), 200


@app.route('/newEvent', methods=['POST', 'GET'])  # 新增事件
def add_event():
    data = request.get_json()
    print(data)
    body = data['body']
    header = data['headers']['Authorization'].split()  # 获取
    print(body)
    print('user_id:', body['id'])
    print(header)
    if len(header) != 2:
        return jsonify({'message': 'token无效！'}), 401
    token = header[1]
    try:
        user_name = s.loads(token)
        user = td_user.query.filter_by(user=user_name['username']).first()
    except:
        return jsonify({'message': 'token无效！'}), 401
    print('user_id:',user.id)
    new_event = td_events(user_id=user.id, event_id=body['id'], date=body['date'], priority=body['priority'],
                          text=body['content'], isdelete=1)
    db.session.add(new_event)
    db.session.commit()
    return jsonify({'message': 'loading success！'})


@app.cli.command()
def create():
    db.drop_all()
    db.create_all()


if __name__ == '__main__':
    app.run()
