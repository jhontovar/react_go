import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import { map } from "lodash"
import configRouting from "./configRouting"

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                {
                    map(configRouting, (route, index) =>
                        (<Route key={index} path={route.path} element={<route.page />} />)
                    )
                }
            </Routes>
        </BrowserRouter>
    )
}
