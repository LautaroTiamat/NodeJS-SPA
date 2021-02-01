const RenderView = (param) => {
    document.title = param.title;
    
    return param.content;
};

export default RenderView