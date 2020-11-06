async function getLinks() {
    const users = await fetch('./Links')
        .then(response => response.json())
        .then(json => {
            return json
        });

    displayLinks(users)

    /* const users = [{
        "read": false,
        "_id": "5f935089fa64070008390897",
        "link": "https://www.mazdausa.com/mazda-heroes?campId=284152864",
        "__v": 0
    }, {
        "read": false,
        "_id": "5f9350abfa64070008390898",
        "link": "https://www.reddit.com/r/javascript/comments/jgqmdg/adding_authorization_to_a_nodejs_app_beyond/?utm_source=share",
        "__v": 0
    }, {
        "read": true,
        "_id": "5f935061fa64070008390896",
        "link": "https://cameronthompson.io/",
        "__v": 0
    }, {
        "read": false,
        "_id": "5f9357ff45b4f5000899e5f9",
        "link": "https://www.vroom.com/inventory/5YJXCDE22HF049771/?utm_source=ios",
        "__v": 0
    }]
    displayLinks(users) */

}


function displayLinks(links) {
    var list = document.getElementById('links');
    links.sort(function (a, b) {
        if (a.read === false && b.read === true) {
            return -1;
        } else if (a.read === true && b.read === false) {
            return 1;
        }
        return 0;
    }).forEach(l => {
        var linkLength = l.link.length;
        var linkTitle;
        /* if (linkLength > 20) {
            var linkTitle = l.link.substr(0, 20) + "\u2026";
        } else {
            var linkTitle = l.link;
        } */
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

        li.append(aTag)
        li.appendChild(deleteIcon)
        // li.appendChild(iconContainer)
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