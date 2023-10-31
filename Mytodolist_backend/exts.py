# 文件存在是为了解决循环引用
# flask-sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS #跨域
# 创建数据库实例对象
db = SQLAlchemy()
cors=CORS()
