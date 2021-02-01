import RenderView from './views/RenderView.js';
/* --------------------------------------------------------- */
import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";

const pathToRegex = path => {
    return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
};

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/posts/:id", view: PostView },
        { path: "/settings", view: Settings }
    ];

    /* ...................... */
    const dbRoutes = [
        {
            path: '/demo1',
            title: "Demo1",
            content: `
                <h1>DEMO 1</h1>
                <p>
                    DEMO 1 DEMO 1.
                </p>
            `
        },{
            path: '/demo2',
            title: "Demo2",
            content: "DEMO DEMO2"
        },{
            path: '/demo2/:id',
            title: "Demo2 - ID",
            content: `ID: <id id="pathID"/>`
        }
    ];
    /* ...................... */

    dbRoutes.map(e => {
        routes.push({ path: e.path, view: () => {
            return RenderView({title: e.title, content: e.content});
        }});
    });

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if(!match){
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    };

    const result = location.pathname.match(pathToRegex(match.route.path));
    const id = result[1];

    const view = match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = view;

    const pathID = document.querySelector('#pathID');
    pathID ? pathID.innerHTML = id : null;
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});