function getResult() {
    const url = new URL(window.location.href);
    return url.searchParams.get('q');
}

function findInData(search) {
    let results = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(search.toLowerCase())) {
            results.push(data[i]);
        }
    }
    return results;
}

function generatePage() {
    const result = findInData(getResult());

    if (result.length != 0) {
        result.forEach(person => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const h3 = document.createElement('h3');
            const h3text = document.createTextNode(person.phone);
            const h2text = document.createTextNode(person.name + ":");
            h2.appendChild(h2text);
            h3.appendChild(h3text);
            div.appendChild(h2);
            div.appendChild(h3);
            document.body.appendChild(div);
        })
    } else {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const text = document.createTextNode("No Results Found");
        h2.appendChild(text);
        div.appendChild(h2);
        document.body.appendChild(div);
    }
}

generatePage();