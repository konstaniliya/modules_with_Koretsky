function loadScript(path, callback){
    const script = document.createElement('script');

    script.src = path;
    script.onload = callback;

    document.head.appendChild(script);
}