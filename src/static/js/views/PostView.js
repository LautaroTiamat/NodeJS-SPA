const RenderPage = (param) => {
    document.title = "Viewing Post";
    
    return `
        <h1>Post</h1>
        <p>POST ID: ${param.id}</p>
    `;
};

export default RenderPage;