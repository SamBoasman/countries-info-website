import React from "react";
import { useState } from "react";

import { Root, Root2 } from "./TStypes/CountryType";

import axios from "axios";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Paper, Skeleton, TextField } from "@mui/material";

import "./App.css";

function App() {
    const [countryName, setCountryName] = useState("");
    const [countryInfo, setCountryInfo] = useState<undefined | Root2>(
        undefined
    );

    const COUNTRIES_URL = "https://restcountries.com/v3.1/name/";

    return (
        <div>
            <div className="search-field">
                <h1 className="App-header">Country Search</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                        id="search-bar"
                        className="text"
                        value={countryName}
                        onChange={(prop: any) => {
                            setCountryName(prop.target.value);
                        }}
                        label="Enter a country name"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}
                    />
                    <IconButton
                        aria-label="search"
                        onClick={() => {
                            search();
                        }}
                    >
                        <SearchIcon style={{ fill: "black" }} />
                    </IconButton>
                </div>
            </div>

            <div className="search-result">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {countryInfo === undefined || countryInfo === null ? (
                        <p>No such country found</p>
                    ) : (
                        <Paper
                            sx={{
                                backgroundColor: "#EEFFEE",
                                maxWidth: "800px",
                                width: "80%",
                                padding: "20px 20px",
                            }}
                        >
                            <div className="container">
                                <div className="item">
                                    {countryInfo?.flags === undefined ? (
                                        <p>No map found</p>
                                    ) : (
                                        <img
                                            src={countryInfo?.flags.png}
                                            style={{}}
                                        />
                                    )}
                                    <p>National flag (above)</p>
                                </div>
                                <div className="item">
                                    <p>
                                        Common name: {countryInfo.name.common}
                                        <br />
                                        Official name:{" "}
                                        {countryInfo.name.official}.
                                        <br />
                                        Capital: {countryInfo.capital}
                                        <br />
                                        Region: {countryInfo.region}
                                        <br />
                                        Locate:{" "}
                                        <a href={countryInfo.maps.googleMaps}>
                                            Google Maps
                                        </a>
                                        <br />
                                    </p>
                                </div>
                                <div className="item">
                                    <p>
                                        Area: {countryInfo.area} km^2
                                        <br />
                                        Population: {countryInfo.population}
                                        <br />
                                        Drives on the {countryInfo.car.side}
                                        <br />
                                        Start of week:{" "}
                                        {countryInfo.startOfWeek
                                            .charAt(0)
                                            .toUpperCase() +
                                            countryInfo.startOfWeek.slice(1)}
                                    </p>
                                </div>
                                <div className="item">
                                    <p>Coat of Arms (below)</p>
                                    {countryInfo?.coatOfArms === undefined ? (
                                        <p>No coat of arms found</p>
                                    ) : (
                                        <img
                                            src={countryInfo?.coatOfArms.png}
                                            style={{
                                                maxWidth: "300px",
                                            }}
                                            alt="Coat of arms failed to render"
                                        />
                                    )}
                                </div>
                            </div>
                        </Paper>
                    )}
                </div>
            </div>
        </div>
    );

    function search() {
        {
            countryName !== ""
                ? axios
                      .get(COUNTRIES_URL + countryName.toLowerCase())
                      .then((res) => {
                          setCountryInfo(res.data[0]);
                      })
                      .catch((err) => {
                          console.log("Country not found");
                          setCountryInfo(undefined);
                      })
                : console.log("can't search null");
        }
    }
}

export default App;
