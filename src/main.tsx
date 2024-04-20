import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import "./index.css";


import App from "./App";
import ConversionsHome from "./components/conversions/Home";
import BinaryToHex from "./components/routes/BinaryToHex";
import BinaryToDenary from "./components/routes/BinaryToDenary";
import HexToDenary from "./components/routes/HexToDenary";
import NotFound from "./components/NotFound";
import Home from "./components/routes/Home";
import ConversionsTemplate from "./components/routes/ConversionsTemplate";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/conversions" element={<ConversionsTemplate />}>
                <Route index element={<ConversionsHome />} />
                <Route path="/conversions/binary-to-hex" element={<BinaryToHex />} />
                <Route path="/conversions/binary-to-denary" element={<BinaryToDenary />} />
                <Route path="/conversions/hex-to-denary" element={<HexToDenary />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)