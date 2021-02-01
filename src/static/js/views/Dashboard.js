const RenderPage = () => {
    document.title = "Dashboard";
    
    return `
        <h1>Bienvenido!</h1>
        <p>
            Texto demo...
        </p>
        <p>
            <a href="/posts" data-link>POSTS</a>.
        </p>
    `;
};

export default RenderPage;