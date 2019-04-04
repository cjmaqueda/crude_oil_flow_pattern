import pandas as pd

from flask import Flask, render_template, jsonify

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# The database URI
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/emoji.sqlite"

db = SQLAlchemy(app)


# Create our database model
class Emoji(db.Model):
    __tablename__ = 'emoji'

    id = db.Column(db.Integer, primary_key=True)
    emoji_char = db.Column(db.String)
    emoji_id = db.Column(db.String)
    name = db.Column(db.String)
    score = db.Column(db.Integer)


# Create database tables
@app.before_first_request
def setup():
    # Recreate database each time for demo
    # db.drop_all()
    db.create_all()


@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("/emoji_char")
def emoji_char_data():
    """Return emoji score and emoji char"""

    # Query for the top 10 emoji data
    results = db.session.query(Emoji.emoji_char, Emoji.score).\
        order_by(Emoji.score.desc()).\
        limit(10).all()

    # Create lists from the query results
    emoji_char = [result[0] for result in results]
    scores = [int(result[1]) for result in results]

    # Generate the plot trace
    trace = {
        "x": emoji_char,
        "y": scores,
        "type": "bar"
    }
    return jsonify(trace)


@app.route("/emoji_id")
def emoji_id_data():
    """Return emoji score and emoji id"""

    # Query for the emoji data using pandas
    query_statement = db.session.query(Emoji).\
        order_by(Emoji.score.desc()).\
        limit(10).statement
    df = pd.read_sql_query(query_statement, db.session.bind)

    # Format the data for Plotly
    trace = {
        "x": df["emoji_id"].values.tolist(),
        "y": df["score"].values.tolist(),
        "type": "bar"
    }
    return jsonify(trace)


@app.route("/emoji_name")
def emoji_name_data():
    """Return emoji score and emoji name"""

    # Query for the top 10 emoji data
    results = db.session.query(Emoji.name, Emoji.score).\
        order_by(Emoji.score.desc()).\
        limit(10).all()
    df = pd.DataFrame(results, columns=['name', 'score'])

    # Format the data for Plotly
    trace = {
        "x": df["name"].values.tolist(),
        "y": df["score"].values.tolist(),
        "type": "bar"
    }
    return jsonify(trace)


if __name__ == '__main__':
    app.run(debug=True)
