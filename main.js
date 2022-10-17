document.querySelector('button').addEventListener('click', getList)
function getList() {
    let show = document.querySelector('select').value
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < show; i++) {
                const newRow = document.createElement('tr')
                newRow.innerHTML =
                    `<td>${data[i].facility}</td>
            <td>${data[i].city}</td>
            `
                document.querySelector('table').appendChild(newRow)
                let latitude = data[i].location.latitude
                let longitude = data[i].location.longitude

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=89475dfc4d245aaaee28bc1530fe5243`)
                    .then(res => res.json())
                    .then( data =>{
                        console.log(data)
                        let temp = ` ${Math.round((data.main.temp - 273.15) * 9/5 + 32)} degrees` 
                        newRow.innerHTML +=  ` <td>${temp}</td> `
                    })
            }
        })
}