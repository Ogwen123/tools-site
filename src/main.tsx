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

import StringHome from "./components/string/Home"
import Length from "./components/routes/string/Length";
import RegexMatcher from "./components/routes/string/RegexMatcher";
import MarkdownVisualiser from "./components/routes/visual/MarkdownVisualiser";

import LogicHome from "./components/logic/Home"
import TruthTableGenerator from "./components/routes/logic/TruthTableGenerator";
import Lister from "./components/routes/string/Lister";
import MapsVisualiser from "./components/routes/visual/MapsVisualiser";
import ColourConversions from "./components/routes/conversions/ColourConversions.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/conversions" element={<Template />}>
                <Route index element={<ConversionsHome />} />
                <Route path="/conversions/binary-to-hex" element={<BinaryToHex />} />
                <Route path="/conversions/binary-to-denary" element={<BinaryToDenary />} />
                <Route path="/conversions/hex-to-denary" element={<HexToDenary />} />
                <Route path="/conversions/colour-conversions" element={<ColourConversions />} />
            </Route>
            <Route path="/visual" element={<Template />}>
                <Route index element={<VisualHome />} />
                <Route path="/visual/plotting" element={<Plotting />} />
                <Route path="/visual/markdown-visualiser" element={<MarkdownVisualiser />} />
                <Route path="/visual/maps-visualiser" element={<MapsVisualiser />} />
            </Route>
            <Route path="/string" element={<Template />}>
                <Route index element={<StringHome />} />
                <Route path="/string/string-length" element={<Length />} />
                <Route path="/string/regex-matcher" element={<RegexMatcher />} />
                <Route path="/string/lister" element={<Lister />} />
            </Route>
            <Route path="/logic" element={<Template />}>
                <Route index element={<LogicHome />} />
                <Route path="/logic/truth-table-generator" element={<TruthTableGenerator />} />
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