from flask import blueprint

bp = blueprint('mytodolist', __name__, url_prefix="/mytodlist")

@bp.route('/')
def mytodolist():
    pass



