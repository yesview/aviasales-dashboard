import flask
import time

from dashboard_api import app

data = {
    "last_hour": {
        "position": 1,
        "errorStat": {
            "errors": {"label": "Errors", "value": None},
            "timeout": {"label": "Timeouts", "value": None},
            "zeroes": {"label": "Zeroes", "value": None},
        },
        "errors": [],
        "metrics": {
            "searches": {"label": "Searches", "current": 66815, "previous": 88385,},
            "clicks": {"label": "Clicks", "previous": 428, "current": 784, "ctr": 0.640574721245229},
            "bookings": {
                "label": "Bookings",
                "current": 32,
                "previous": 98,
                "avg_price": 10243.0263157895,
                "str": None,
            }
        }
    },

    "last_3days": {
        "position": 4,
        "errorStat": {
            "errors": {"label": "Errors", "value": 0.143953287057117},
            "zeroes": {"label": "Zeroes", "value": 5.55262854787825},
            "timeout": {"label": "Timeouts", "value": 0.122851836321131},
        },
        "errors": [{"count": 430, "code": 502}, {"count": 720, "code": 599}, {"count": 1780, "code": None}],
        "metrics": {
            "searches": {"label": "Searches", "current": 4445192, "previous": 6118984, "mobile_pessimizer": 0.000999999974737875, "web_pessimizer": 100.0},
            "clicks": {"label": "Clicks", "previous": 60505, "current": 50207, "ctr": 1.12946752356254},
            "bookings": {
                "label": "Bookings",
                "current": 7556,
                "previous": 8647,
                "avg_price": 10694.8964067661,
                "str": 15.0496942657398,
            }
        }
    },
    "yesterday": {
        "position": 3,
        "errorStat": {
            "errors": {"label": "Errors", "value": 0.376232384954177},
            "zeroes": {"label": "Zeroes", "value": 5.03052033295241},
            "timeout": {"label": "Timeouts", "value": 0.217542189065684},
        },
        "errors": [{"count": 615, "code": None}, {"count": 305, "code": 599}],
        "metrics": {
            "searches": {"label": "Searches", "current": 2188541, "previous": 2050500, "mobile_pessimizer": 0.000999999974737875, "web_pessimizer": 100.0},
            "clicks": {"label": "Clicks", "previous": 23364, "current": 23210, "ctr": 1.06052388326287},
            "bookings": {
                "label": "Bookings",
                "current": 3465,
                "previous": 3641,
                "avg_price": 9447.87135852322,
                "str": 14.9289099526066,
            }
        }
    },
    "today": {
        "position": 2,
        "errorStat": {
            "errors": {"label": "Errors"},
            "zeroes": {"label": "Zeroes"},
            "timeout": {"label": "Timeouts"},
        },
    },
}

@app.route("/api/v1/last_hour", methods=["GET"])
def last_hour():
    return flask.jsonify(data["last_hour"])

@app.route("/api/v1/today", methods=["GET"])
def today():
    return flask.jsonify(data["today"])

@app.route("/api/v1/yesterday", methods=["GET"])
def yesterday():
    return flask.jsonify(data["yesterday"])

@app.route("/api/v1/last_3days", methods=["GET"])
def last_3days():
    # time.sleep(3)
    return flask.jsonify(data["last_3days"])