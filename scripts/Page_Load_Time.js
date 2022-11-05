(function () {
    window.onload = function page_load_time() {
        let time = performance.timing;
        let page_load_time = time.loadEventStart - time.navigationStart;
        document.getElementById("Page_Load_Time").innerText = "Page load time: " +
            +page_load_time.toString() + " ms"
    }
})()