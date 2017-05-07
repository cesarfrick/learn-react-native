function cleanUsername(username) {
    return username.toLowerCase().trim();
}
export function getRepos(username) {
    const user = cleanUsername(username);
    const url = `https://api.github.com/users/${user}/repos`;

    return fetch(url).then(res => res.json());
}

export function getBio(username) {
    const user = cleanUsername(username);
    const url = `https://api.github.com/users/${user}`;

    return fetch(url).then(res => res.json());
}

export function getNotes(username) {
    const user = cleanUsername(username);
    const url = `https://github-notetaker-88c18.firebaseio.com/${user}.json`;
    
    return fetch(url).then( res => res.json());
}

export function addNote(username, note) {
    const user = cleanUsername(username);
    const url = `https://github-notetaker-88c18.firebaseio.com/${user}.json`;
    
    return fetch( url, {
        method: 'post',
        body: JSON.stringify(note)
    }).then( res => res.json() );
}


export default {
    getRepos,
    getBio,
    getNotes,
    addNote
}