from exts import db


class td_events(db.Model):
    __tablename__ = 'td_events'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('td_user.id'), nullable=True)
    event_id = db.Column(db.BigInteger)
    date = db.Column(db.DateTime, nullable=True)
    priority = db.Column(db.String(255), nullable=True)
    text = db.Column(db.String(255), nullable=True)
    isdelete = db.Column(db.Boolean, default=False)
    user = db.relationship('td_user', backref='events')

    def __repr__(self):
        return f"<td_events id={self.id} date={self.date} priority={self.priority} text={self.text}>"


class td_user(db.Model):
    __tablename__ = 'td_user'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(255), nullable=True)
    password = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f"<td_user id={self.id} user={self.user}>"

class temp_id(db.Model):
    __tablename__ = 'temp_id'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<temp_id id={self.id} user_id={self.user_id}>"