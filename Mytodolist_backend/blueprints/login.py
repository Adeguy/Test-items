from flask import blueprint, render_template

bp=blueprint('login',__name__,url_prefix='/')

@bp.route('/')
def login():
    return render_template("../static/App.js")