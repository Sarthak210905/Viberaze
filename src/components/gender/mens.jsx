import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function Mens() {
    const mode = "light";

    return (
        <Router>
            <Routes>
                <Route 
                    path="/men" 
                    element={
                        <div>
                            <Link
                                to="/men"
                                className="text-sm font-medium text-gray-700"
                                style={{
                                    height: "100px",
                                    width: "100px",
                                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                                    color: mode === "dark" ? "white" : ""
                                }}
                            >
                                mens
                            </Link>
                        </div>
                    } 
                />
            </Routes>
        </Router>
    );
}
