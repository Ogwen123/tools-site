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
import Template from "./components/routes/Template";
import NotFound from "./components/NotFound";
import Home from "./components/routes/Home";

import ConversionsHome from "./components/conversions/Home";
import BinaryToHex from "./components/routes/conversions/BinaryToHex";
import BinaryToDenary from "./components/routes/conversions/BinaryToDenary";
import HexToDenary from "./components/routes/conversions/HexToDenary";

import VisualHome from "./components/visual/Home";
import Plotting from "./components/routes/visual/Plotting";

import MiscHome from "./components/misc/Home"
import Length from "./components/routes/string/Length";
import RegexMatcher from "./components/routes/string/RegexMatcher";
import MarkdownVisualiser from "./components/routes/visual/MarkdownVisualiser";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/conversions" element={<Template />}>
                <Route index element={<ConversionsHome />} />
                <Route path="/conversions/binary-to-hex" element={<BinaryToHex />} />
                <Route path="/conversions/binary-to-denary" element={<BinaryToDenary />} />
                <Route path="/conversions/hex-to-denary" element={<HexToDenary />} />
            </Route>
            <Route path="/visual" element={<Template />}>
                <Route index element={<VisualHome />} />
                <Route path="/visual/plotting" element={<Plotting />} />
                <Route path="/visual/markdown-visualiser" element={<MarkdownVisualiser />} />
            </Route>
            <Route path="/string" element={<Template />}>
                <Route index element={<MiscHome />} />
                <Route path="/string/string-length" element={<Length />} />
                <Route path="/string/regex-matcher" element={<RegexMatcher />} />
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