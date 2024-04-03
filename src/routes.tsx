import { Route, Routes as Routers, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
export const Routes = () => {
    return (
        <BrowserRouter>
            <Routers>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/"          element={<Home/>} />

            </Routers>
        </BrowserRouter>
    )
}
