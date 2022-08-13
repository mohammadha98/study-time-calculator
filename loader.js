document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("result")) {
        var arrayResult = JSON.parse(localStorage.getItem("result"));
        arrayResult.forEach((element, index) => {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            td2.textContent = index + 1;
            td2.style.width = "80px";
            td1.textContent = element.durationShow.substring(0, 5);
            tr.appendChild(td1);
            td1.after(td2);
            document.getElementById("customers").appendChild(tr);
        });

    }


});