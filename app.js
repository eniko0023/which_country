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
        const countryNames = getNames(data);
        startButtonManager(countryNames, data);
    } catch(error){
        console.log(error.message);
    }
}

//zaszlokepek listajat elkesziti
function getFlags(data){
    const flags = data.map(item => item.flags.png)
    return flags;
}

//orszagok neveinek listaja
function getNames(data){
    const countries = data.map(({ name }) => name.common)
    return countries;
}

//zaszlok renderelese
function renderFlags(flags) {
    const container = document.querySelector(".flags");
    container.innerHTML = "";
    const content = flags.map(flag => `
        <div><img src="${flag}"></div>
        `).join("");
    container.innerHTML = content;
}

//getrandomname
function getRandomName(nameList){
    const countryName = nameList.sort(() => Math.random() - 0.5).splice(0, 1);
    return countryName;
}

//a kitalalndo orszag nevet sorsoljuk
function showRandomName(name){
    const input = document.querySelector("[type='text']");
    if (input instanceof HTMLInputElement){
        input.value = "";
        input.value = name;
    }
}

//flags manager
function flagsManager(nameList, data){
    
}