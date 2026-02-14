import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {

    return (
        <div>
            <Navbar />
            <div className="p-6 max-w-5xl mx-auto">
                <Outlet />
            </div>
        </div>
    );
}
