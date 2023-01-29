import React from "react";
import AppBootstrap from "./src/components/app-bootstrap/app-bootstrap";
import Navigator from "./src/config/navigator";

export default function App(){
    return (
        <AppBootstrap>
            <Navigator />
        </AppBootstrap>
    );
}
