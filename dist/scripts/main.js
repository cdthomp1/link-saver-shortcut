async function start() {
    var links = await getLinks();
    if (links)
        displayLinks(links)

   /*  var categories = await getCategories();
    if (categories)
        displayCategories(categories) */
}

async function getLinks() {
    const links = await fetch('./api/getLinks')
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(json => {
            return json
        })
        .catch(err => {
            console.log(err)
            document.getElementById('err').innerText = `${err}`;
            document.getElementsByClassName('error')[0].style.display = 'block';
        });

    return links
}

/* async function getCategories() {
    const categories = await fetch('./Categories')
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(json => {
            return json;
        })
        .catch(err => {
            console.log(err)
            document.getElementById('err').innerText = `${err}`;
            document.getElementsByClassName('error')[0].style.display = 'block';
        });
    return categories

} */

function displayCategories(categories) {
    var list = document.getElementById('categories');
    var categoriesList = `<li onclick="show('all')">all</li>`;
    categories.forEach(c => {
        categoriesList += `<li onclick="show('${c.category}')">${c.category}</li>`
    })
    console.log(categoriesList)
    list.innerHTML = categoriesList;
}

async function displayLinks(links) {
    const categories = await getCategories()
    var list = document.getElementById('links');
    links.sort(function (a, b) {
        if (a.read === false && b.read === true) {
            return -1;
        } else if (a.read === true && b.read === false) {
            return 1;
        }
        return 0;
    }).forEach((l) => {
        console.log(l)
        var linkLength = l.link.length;
        var linkTitle;
        var linkTitle = l.link;

        const li = document.createElement('li');
        li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
        const aTag = document.createElement('a');
        aTag.setAttribute('class', "link")
        aTag.setAttribute('target', '_blank');
        const text = document.createTextNode(linkTitle);

        const iconContainer = document.createElement('div');
        iconContainer.setAttribute("class",
            "iconContainer d-flex justify-content-between align-items-center")

        const categorySelect = document.createElement('select');
        categorySelect.setAttribute('id', l._id)
        categorySelect.setAttribute("onChange", "addToGroup(this.id, this.value)");

        var categoryOptions = ''
        if (l.category) {
            categoryOptions += `<option value="${l.category}">${l.category}</option>`
        } else {
            categoryOptions += `<option value="all">None Set</option>`
        }
        categories.forEach(c => {
            categoryOptions += `<option value="${c.category}">${c.category}</option>`
        })
        categorySelect.innerHTML = categoryOptions




        const deleteIcon = document.createElement('i');
        deleteIcon.setAttribute("class", "fas fa-trash-alt")
        deleteIcon.setAttribute("onClick", "deleteLink(this.id)");
        deleteIcon.setAttribute('id', l._id);

        const readIcon = document.createElement('i');
        if (l.read === true) {
            readIcon.setAttribute("class", "far fa-check-square")
            readIcon.setAttribute("onClick", "unread(this.id)")
            readIcon.setAttribute('id', l._id)
        } else {
            readIcon.setAttribute("class", "far fa-square")
            readIcon.setAttribute("onClick", "read(this.id)")
            readIcon.setAttribute('id', l._id)
        }


        aTag.setAttribute("href", l.link);
        li.appendChild(readIcon)
        aTag.appendChild(text);

        iconContainer.appendChild(categorySelect)
        iconContainer.appendChild(deleteIcon)

        li.append(aTag)
        li.appendChild(iconContainer)
        list.appendChild(li);
    })
}

function read(id) {
    var link = document.getElementById(id)
    link.classList.remove('fa-square')
    link.classList.add('fa-check-square')
    link.setAttribute('onClick', 'unread(this.id)')
    fetch(`/update`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            read: true
        })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        });
}

function unread(id) {
    var link = document.getElementById(id)
    link.classList.remove('fa-check-square')
    link.classList.add('fa-square')
    link.setAttribute('onClick', 'read(this.id)')
    fetch(`/update`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            read: false
        })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        });
}

function deleteLink(id) {
    var linkEle = document.getElementById(id).parentElement
    linkEle.remove();
    fetch(`/delete`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: id
        })
    })
        .then(response => response.json())
        .then(json => { });
}

function addToGroup(id, value) {
    console.log(id, value)

    fetch(`/linkCategory`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            category: value
        })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        });
}

async function show(category) {
    console.log(category)
    document.getElementById('links').innerHTML = ''
    var links = await getLinks();
    if (category !== 'all') {
        var filteredLinks = links.filter(l => l.category === category)
        console.log(filteredLinks)
        displayLinks(filteredLinks);
        return 0;
    }
    displayLinks(links);

}