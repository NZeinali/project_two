from flask import Flask, jsonify, render_template
import numpy as np
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import password

#################################################
# Database Setup
#################################################
# Create the Database Engine - local server, the connection string will be as follows:
connection_string = f"postgres:{password}@127.0.0.1:5432/ProjectTwo"

# Create the database engine (to the PostgreSQL database)
engine = create_engine(f'postgresql://{connection_string}')
conn = engine.connect()
session = Session(bind=engine)

Base = automap_base()

Base.prepare(engine, reflect=True)


#################################################
# Flask Setup
#################################################

app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return (
        f"#################################################################################<br/>"
        f"Welcome to the Property Market API of Perth, Western Australia!<br/>"
        f"#################################################################################<br/>"
        f"Here are the list of available routes:<br/>"
        f"#################################################################################<br/>"
        f"/api/v1.0/suburb ------------- Returns a JSON list of property suburb.<br/>"
        f"<br/>"
        f"/api/v1.0/price ------------------ Returns a JSON list of property price.<br/>"
        f"<br/>"
        f"/api/v1.0/bedrooms ------------- Returns a JSON list of property bedrooms.<br/>"
        f"<br/>"
        f"/api/v1.0/land_area ------------------ Returns a JSON list of property land area.<br/>"
        f"<br/>"
        f"/api/v1.0/build_year ------------- Returns a JSON list of bulit year of property.<br/>"
        f"<br/>"
        f"/api/v1.0/cbd_dist ------------------ Returns a JSON list of property distance to CBD.<br/>"
        f"<br/>"
        f"/api/v1.0/nearest_stn ------------- Returns a JSON list of the nearest train station to property.<br/>"
        f"<br/>"
        f"/api/v1.0/nearest_stn_dist ------------------ Returns a JSON list of property distance to the nearest train station.<br/>"
        f"<br/>"
        f"/api/v1.0/nearest_sch ------------- Returns a JSON list of the nearest school to property.<br/>"
        f"<br/>"
        f"/api/v1.0/nearest_sch_dist ------------------ Returns a JSON list of property distance to the nearest school.<br/>"
        f"<br/>"
        f"/api/v1.0/latitude ------------- Returns a JSON list of property latitude.<br/>"
        f"<br/>"
        f"/api/v1.0/longitude ------------------ Returns a JSON list of property longitude.<br/>"
        f"<br/>"
        f"/api/v1.0/year_sold ------------- Returns a JSON list of the years properties were sold .<br/>"
    )

#################################################


@app.route("/analysis")
def analysis_page():
    return render_template("index.html")

######################


@app.route("/leafletmap")
def map_page():
    return render_template("map.html")

######################


@app.route("/resource")
def table_page():
    return render_template("table.html")

######################


@app.route("/mapjson")
def map_func():

    session = Session(bind=engine)
    mapAnalysis = Base.classes.map_analysis

    map_data = session.query(
        mapAnalysis.address, mapAnalysis.suburb, mapAnalysis.latitude, mapAnalysis.longitude, mapAnalysis.land_area, mapAnalysis.price).all()

    session.close()

    map_list = []
    for row in map_data:
        map_result = list(np.ravel(row))
        map_dict = {
            "Address": map_result[0], "Suburb": map_result[1], "Latitude": map_result[2], "Longitude": map_result[3], "Land_Area": map_result[4], "Price": map_result[5]}
        map_list.append(map_dict)

    return jsonify(map_list)

#################################################


@app.route("/agejson")
def age_func():

    session = Session(bind=engine)
    ageAnalysis = Base.classes.house_age_analysis

    house_age_data = session.query(
        ageAnalysis.address, ageAnalysis.build_year, ageAnalysis.land_area, ageAnalysis.price).all()

    session.close()

    age_list = []
    for row in house_age_data:
        age_result = list(np.ravel(row))
        age_dict = {
            "Address": age_result[0], "Build_Year": age_result[1], "Land_Area": age_result[2], "Price": age_result[3]}
        age_list.append(age_dict)

    return jsonify(age_list)

#################################################


@app.route("/suburbAgejson")
def suburbAge_func():

    session = Session(bind=engine)

    age_Analysis = Base.classes.house_age_analysis
    suburb_Analysis = Base.classes.suburb_analysis

    # Join two datasets
    sel = [suburb_Analysis.suburb, age_Analysis.address, age_Analysis.build_year, age_Analysis.land_area,
           age_Analysis.price, suburb_Analysis.address]

    join_query = session.query(
        *sel).filter(age_Analysis.address == suburb_Analysis.address).all()

    session.close()

    age_suburb_list = []
    for row in join_query:
        age_suburb_result = list(np.ravel(row))
        age_suburb_dict = {
            "Suburb": age_suburb_result[0], "Address": age_suburb_result[1], "Build_Year": age_suburb_result[2], "Land_Area": age_suburb_result[3], "Price": age_suburb_result[4]}
        age_suburb_list.append(age_suburb_dict)

    return jsonify(age_suburb_list)


#################################################


@app.route("/bedroomsjson")
def bedrooms_func():

    session = Session(bind=engine)
    bedroomAnalysis = Base.classes.number_of_bedrooms_analysis

    bedrooms_data = session.query(
        bedroomAnalysis.address, bedroomAnalysis.year_sold, bedroomAnalysis.bedrooms, bedroomAnalysis.land_area, bedroomAnalysis.price).all()

    session.close()

    bedroom_list = []
    for row in bedrooms_data:
        bedroom_result = list(np.ravel(row))
        bedroom_dict = {
            "Address": bedroom_result[0], "Year_Sold": bedroom_result[1], "Bedrooms": bedroom_result[2], "Land_Area": bedroom_result[3], "Price": bedroom_result[4]}
        bedroom_list.append(bedroom_dict)

    return jsonify(bedroom_list)

#################################################


# @app.route("/distance")
# def distance_page():
#     return render_template("distance.html")

######################


@app.route("/distancejson")
def distance_func():

    session = Session(bind=engine)
    distanceAnalysis = Base.classes.distance_analysis

    distance_data = session.query(
        distanceAnalysis.address, distanceAnalysis.cbd_dist, distanceAnalysis.nearest_stn, distanceAnalysis.nearest_stn_dist, distanceAnalysis.nearest_sch, distanceAnalysis.nearest_sch_dist, distanceAnalysis.land_area, distanceAnalysis.price).all()

    session.close()

    distance_list = []
    for row in distance_data:
        distance_result = list(np.ravel(row))
        distance_dict = {
            "Address": distance_result[0], "CBD_Dist": distance_result[1],  "Nearest_STN": distance_result[2], "Nearest_STN_Dist": distance_result[3], "Nearest_SCH": distance_result[4], "Nearest_SCH_Dist": distance_result[5], "Land_Area": distance_result[6], "Price": distance_result[7]}
        distance_list.append(distance_dict)

    return jsonify(distance_list)

#################################################


# @app.route("/suburb")
# def suburb_page():
#     return render_template("suburb.html")

######################


@app.route("/suburbjson")
def suburb_func():

    session = Session(bind=engine)
    suburbAnalysis = Base.classes.suburb_analysis

    suburb_data = session.query(
        suburbAnalysis.address, suburbAnalysis.suburb, suburbAnalysis.land_area, suburbAnalysis.price).all()

    session.close()

    suburb_list = []
    for row in suburb_data:
        suburb_result = list(np.ravel(row))
        suburb_dict = {
            "Address": suburb_result[0], "Suburb": suburb_result[1], "Land_Area": suburb_result[2], "Price": suburb_result[3]}
        suburb_list.append(suburb_dict)

    return jsonify(suburb_list)

#################################################


@app.route("/perthMarketjson")
def market_func():

    session = Session(bind=engine)
    marketAnalysis = Base.classes.perth_market

    market_data = session.query(
        marketAnalysis.address, marketAnalysis.suburb, marketAnalysis.price, marketAnalysis.bedrooms, marketAnalysis.land_area, marketAnalysis.build_year,
        marketAnalysis.cbd_dist, marketAnalysis.nearest_stn, marketAnalysis.nearest_stn_dist, marketAnalysis.latitude,
        marketAnalysis.longitude, marketAnalysis.nearest_sch, marketAnalysis.nearest_sch_dist, marketAnalysis.year_sold).all()

    session.close()

    market_list = []
    for row in market_data:
        market_result = list(np.ravel(row))
        market_dict = {
            "Address": market_result[0], "Suburb": market_result[1], "Price": market_result[2], "Bedrooms": market_result[3], "Land_Area": market_result[4], "Build_Year": market_result[5],
            "CBD_Dist": market_result[6], "Nearest_STN": market_result[7], "Nearest_STN_Dist": market_result[8], "Latitude": market_result[9], "Longitude": market_result[10],
            "Nearest_SCH": market_result[11], "Nearest_SCH_Dist": market_result[12], "Year_Sold": market_result[13]}
        market_list.append(market_dict)

    return jsonify(market_list)

#################################################


if __name__ == "__main__":
    app.run(debug=True)
