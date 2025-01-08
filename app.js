window.onload = sendRequest();

async function sendRequest() {
    const url = "https://restcountries.com/v3.1/region/europe";
    try{
        const response = await fetch(url,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        if(!response.ok){
            throw new Error("Request error!", response.status);
        }
        const data = await response.json();
        console.log(data);
        const flags = getFlags(data);
        renderFlags(flags);
        // console.log(flags);
        const countryNames = getNames(data);
    } catch(error){
        console.log(error.message);
    }
}

function getFlags(data){
    const flags = data.map(item => item.flags.png)
    return flags;
}

function getNames(data){
    const countries = data.map(({ name }) => name.common)
    return countries;
}

function renderFlags(flags) {
    const container = document.querySelector(".flags")
    container.innerHTML = ""
    const content = flags.map(flag => `
        <div><img src="${flag}"></div>
        `).join("");
    container.innerHTML = content
}