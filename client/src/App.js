import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
//components
import PublicRoutes from "src/routes/PublicRoutes";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <SnackbarProvider>
                    <PublicRoutes />
                </SnackbarProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
