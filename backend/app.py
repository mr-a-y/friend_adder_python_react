#TODO: UPDATE THIS FILE FOR DEPLOYEMENT 
from flask import Flask ,send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app)



frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

#server static filed from the "dist" folder from frontend ditrectory
#the reson we are doing this is because we are using vue.js for the frontend and vue.js will build the frontend files in the dist folder
#so we need to serve the files from the dist folder so that instead of having 1 server for the backend and another server for the frontend we can have both the backend and frontend in the same server
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)





# these are the api routes for getting and posting data
import routes

with app.app_context():
    db.create_all()


if __name__ =="__main__":
    app.run(debug = True)
