// const details = [
//     {
//         username: "username1",
//         points: 50,
//         dateOfLastSubmission: Date.now(),
//     },
//     {
//         username: "username2",
//         points: 100,
//         dateOfLastSubmission: Date.now() + 99,
//     },
//     {
//         username: "username3",
//         points: 50,
//         dateOfLastSubmission: Date.now() - 50,
//     },
// ];

// const details = get this from firebase
details.sort((a, b) => {
    if (a.points > b.points) return -1;
    if (a.points === b.points) {
        if (a.username < b.username) return -1;
        return 1;
    }
    return 1;
});

details[0].rank = 1;
delete details[0].dateOfLastSubmission;

for (let i = 1; i < details.length; i++) {
    const prev = details[i - 1];
    const curr = details[i];
    delete curr.dateOfLastSubmission;
    if (prev.points === curr.points) curr.rank = prev.rank;
    else curr.rank = prev.rank + 1;
}

console.log(details);
