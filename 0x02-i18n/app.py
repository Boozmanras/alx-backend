#!/usr/bin/env python3
from flask import Flask, render_template, request, g
from flask_babel import Babel, _, format_datetime
import pytz
from datetime import datetime


app = Flask(__name__)


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    user_id = request.args.get('login_as')
    if user_id and int(user_id) in users:
        return users[int(user_id)]
    return None


@babel.localeselector
def get_locale():
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    user = g.get('user')
    if user and user['locale'] in app.config['LANGUAGES']:
        return user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone():
    tz = request.args.get('timezone')
    if tz:
        try:
            return pytz.timezone(tz).zone
        except pytz.exceptions.UnknownTimeZoneError:
            pass
    user = g.get('user')
    if user and user['timezone']:
        try:
            return pytz.timezone(user['timezone']).zone
        except pytz.exceptions.UnknownTimeZoneError:
            pass
    return 'UTC'


@app.before_request
def before_request():
    g.user = get_user()


@app.route('/')
def index():
    current_time = format_datetime(datetime.now(pytz.timezone(get_timezone())))
    return render_template('index.html', current_time=current_time)


if __name__ == '__main__':
    app.run()
