from flask import Flask, jsonify
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
connection_string = f"postgres:{password}@127.0.0.1:5432/Project_2"

# Create the database engine (to the PostgreSQL database)
engine = create_engine(f'postgresql://{connection_string}')
conn = engine.connect()
session = Session(bind=engine)

Base = automap_base()

Base.prepare(engine, reflect=True)


# suburb_first_row = session.query(suburb).first().__dict__

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


@app.route("/api/v1.0/suburb")
def suburb_func():

    session = Session(bind=engine)
    suburb = Base.classes.address_suburb

    address_suburb = session.query(suburb.address, suburb.suburb).all()

    session.close()

    suburb_list = []
    for row in address_suburb:
        suburb_result = list(np.ravel(row))
        suburb_dict = {"Address": suburb_result[0], "Suburb": suburb_result[1]}
        suburb_list.append(suburb_dict)

    return jsonify(suburb_list)

#################################################


@app.route("/api/v1.0/price")
def price_func():

    session = Session(bind=engine)
    price = Base.classes.address_price

    address_price = session.query(price.address, price.price).all()

    session.close()

    price_list = []
    for row in address_price:
        price_result = list(np.ravel(row))
        price_dict = {"Address": price_result[0], "Price": price_result[1]}
        price_list.append(price_dict)

    return jsonify(price_list)

#################################################


@app.route("/api/v1.0/bedrooms")
def bedrooms_func():

    session = Session(bind=engine)
    bedrooms = Base.classes.address_bedrooms

    address_bedrooms = session.query(bedrooms.address, bedrooms.bedrooms).all()

    session.close()

    bedrooms_list = []
    for row in address_bedrooms:
        bedrooms_result = list(np.ravel(row))
        bedrooms_dict = {
            "Address": bedrooms_result[0], "Bedrooms": bedrooms_result[1]}
        bedrooms_list.append(bedrooms_dict)

    return jsonify(bedrooms_list)

#################################################


@app.route("/api/v1.0/land_area")
def land_area_func():

    session = Session(bind=engine)
    land_area = Base.classes.address_land

    address_land = session.query(
        land_area.address, land_area.land_area).all()

    session.close()

    land_area_list = []
    for row in address_land:
        land_area_result = list(np.ravel(row))
        land_area_dict = {
            "Address": land_area_result[0], "Land_Area": land_area_result[1]}
        land_area_list.append(land_area_dict)

    return jsonify(land_area_list)

#################################################


@app.route("/api/v1.0/build_year")
def build_year_func():

    session = Session(bind=engine)
    build_year = Base.classes.address_buildyear

    address_buildyear = session.query(
        build_year.address, build_year.build_year).all()

    session.close()

    build_year_list = []
    for row in address_buildyear:
        build_year_result = list(np.ravel(row))
        build_year_dict = {
            "Address": build_year_result[0], "Build_Year": build_year_result[1]}
        build_year_list.append(build_year_dict)

    return jsonify(build_year_list)

#################################################


@app.route("/api/v1.0/cbd_dist")
def cbd_dist_func():

    session = Session(bind=engine)
    cbd_dist = Base.classes.address_cbddist

    address_cbd_dist = session.query(
        cbd_dist.address, cbd_dist.cbd_dist).all()

    session.close()

    cbd_dist_list = []
    for row in address_cbd_dist:
        address_cbd_dist_result = list(np.ravel(row))
        address_cbd_dist_dict = {
            "Address": address_cbd_dist_result[0], "CBD_Dist": address_cbd_dist_result[1]}
        cbd_dist_list.append(address_cbd_dist_dict)

    return jsonify(cbd_dist_list)

#################################################


@app.route("/api/v1.0/nearest_stn")
def near_stn_func():

    session = Session(bind=engine)
    near_stn = Base.classes.address_neareststation

    address_nearStn = session.query(
        near_stn.address, near_stn.nearest_stn).all()

    session.close()

    near_stn_list = []
    for row in address_nearStn:
        address_nearStn_result = list(np.ravel(row))
        address_nearStn_dict = {
            "Address": address_nearStn_result[0], "Nearest_STN": address_nearStn_result[1]}
        near_stn_list.append(address_nearStn_dict)

    return jsonify(near_stn_list)

#################################################


@app.route("/api/v1.0/nearest_stn_dist")
def near_stn_dist_func():

    session = Session(bind=engine)
    near_stn_dist = Base.classes.address_neareststationdist

    address_nearStn_dist = session.query(
        near_stn_dist.address, near_stn_dist.nearest_stn_dist).all()

    session.close()

    near_stn_dist_list = []
    for row in address_nearStn_dist:
        address_nearStn_dist_result = list(np.ravel(row))
        address_nearStn_dist_dict = {
            "Address": address_nearStn_dist_result[0], "Nearest_STN_Dist": address_nearStn_dist_result[1]}
        near_stn_dist_list.append(address_nearStn_dist_dict)

    return jsonify(near_stn_dist_list)

#################################################


@app.route("/api/v1.0/nearest_sch")
def near_sch_func():

    session = Session(bind=engine)
    near_sch = Base.classes.address_nearestschool

    address_nearSch = session.query(
        near_sch.address, near_sch.nearest_sch).all()

    session.close()

    near_sch_list = []
    for row in address_nearSch:
        address_nearSch_result = list(np.ravel(row))
        address_nearSch_dict = {
            "Address": address_nearSch_result[0], "Nearest_SCH": address_nearSch_result[1]}
        near_sch_list.append(address_nearSch_dict)

    return jsonify(near_sch_list)

#################################################


@app.route("/api/v1.0/nearest_sch_dist")
def near_sch_dist_func():

    session = Session(bind=engine)
    near_sch_dist = Base.classes.address_nearestschooldist

    address_nearSch_dist = session.query(
        near_sch_dist.address, near_sch_dist.nearest_sch_dist).all()

    session.close()

    near_sch_dist_list = []
    for row in address_nearSch_dist:
        address_nearSch_dist_result = list(np.ravel(row))
        address_nearSch_dist_dict = {
            "Address": address_nearSch_dist_result[0], "Nearest_SCH_Dist": address_nearSch_dist_result[1]}
        near_sch_dist_list.append(address_nearSch_dist_dict)

    return jsonify(near_sch_dist_list)

#################################################


@app.route("/api/v1.0/latitude")
def latitude_func():

    session = Session(bind=engine)
    latitude = Base.classes.address_latitude

    address_latitude = session.query(latitude.address, latitude.latitude).all()

    session.close()

    latitude_list = []
    for row in address_latitude:
        latitude_result = list(np.ravel(row))
        latitude_dict = {
            "Address": latitude_result[0], "Latitude": latitude_result[1]}
        latitude_list.append(latitude_dict)

    return jsonify(latitude_list)

#################################################


@app.route("/api/v1.0/longitude")
def longitude_func():

    session = Session(bind=engine)
    longitude = Base.classes.address_longitude

    address_longitude = session.query(
        longitude.address, longitude.longitude).all()

    session.close()

    longitude_list = []
    for row in address_longitude:
        longitude_result = list(np.ravel(row))
        longitude_dict = {
            "Address": longitude_result[0], "Longitude": longitude_result[1]}
        longitude_list.append(longitude_dict)

    return jsonify(longitude_list)

#################################################


@app.route("/api/v1.0/year_sold")
def year_sold_func():

    session = Session(bind=engine)
    year_sold = Base.classes.address_yearsold

    address_year_sold = session.query(
        year_sold.address, year_sold.year_sold).all()

    session.close()

    year_sold_list = []
    for row in address_year_sold:
        year_sold_result = list(np.ravel(row))
        year_sold_dict = {
            "Address": year_sold_result[0], "Year_Sold": year_sold_result[1]}
        year_sold_list.append(year_sold_dict)

    return jsonify(year_sold_list)

#################################################


if __name__ == "__main__":
    app.run(debug=True)
