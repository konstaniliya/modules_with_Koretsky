loadScript('./js/a.js',
    () => {
        loadScript('./js/b.js', () => {
            console.log(a + b);
        });
    });