import "./bootstrap";
import "../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
//CSS
import "../css/login.css";
import "../css/viewHome.css";
import "../css/viewHomeSeller.css";
import "../css/viewHomeWarehouse.css";
import "../css/viewHomeProduction.css";
import "../css/viewHomeLogisctic.css";
import "../css/viewRoutesDetails.css";
import "../css/viewEmployeeDetails.css";
import "../css/viewLayout.css";
import "../css/viewUsers.css";
import "../css/viewProfile.css";
import "../css/viewStore.css";
import "../css/viewRoles.css";
import "../css/viewRegister.css";
import "../css/viewRegisterDetails.css";
import "../css/viewChat.css";
import "../css/Components/navbarMobile.css";
import "../css/Components/modal.css";
import "../css/Components/cardStore.css";
import "../css/Components/footer.css";
import "../css/viewQuickPurchase.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
