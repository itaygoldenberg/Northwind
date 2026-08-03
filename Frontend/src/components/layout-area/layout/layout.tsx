import { Copyrights } from "../copyrights/copyrights";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import { Routing } from "../routing/routing";
import { useLocation } from "react-router-dom";

import "./layout.css";

export function Layout() {
    const location = useLocation();
   

const noScroll =
    location.pathname === "/about" ||
    location.pathname === "/products/new" ||
    location.pathname === "/employees/new";

    return (
        <div className="Layout">

			<header>
                <Header />
            </header>

            <nav>
                <Menu />
            </nav>

            <main className={noScroll ? "no-scroll" : ""}>
                <Routing />
            </main>

            <footer>
                <Copyrights />
            </footer>

        </div>
    );
}
