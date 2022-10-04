const fs = require('fs')
const data = fs.readFileSync('user.json');
const users = JSON.parse(data)

module.exports.getRandomUser = (req, res) => {
    const randomNum = Math.ceil(Math.random() * users.length)
    const result = users.find(user => user.id === randomNum)
    res.send(result)
}


module.exports.getAllUser = (req, res) => {
    const limit = req.query.limit;
    res.send(users.slice(0, limit))
}


module.exports.saveAUser = (req, res) => {
    const data = req.body;
    if (data.name && data.address && data.photoUrl && data.id && data.gender && data.contact) {
        users.push(data)
        fs.writeFile('user.json', JSON.stringify(users), (err) => {
            if (err) {
                res.send('error occurd')
            }
            res.send('successfully add data')
        })
    } else {
        res.send('Missing information')
    }

}


module.exports.updateAUser = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const user = users.find(user => user.id == id)
    if (user) {
        users.forEach(user => {
            if (user.id == id) {
                if (data.gender) { user.gender = data.gender }
                if (data.address) { user.address = data.address }
                if (data.name) { user.name = data.name }
                if (data.photoUrl) { user.photoUrl = data.photoUrl }
                if (data.contact) { user.contact = data.contact }
            }
        })
        fs.writeFile('user.json', JSON.stringify(users), (err) => {
            if (err) {
                res.send('error occurd')
            }
            res.send('successfully update data')
        })
    } else {
        res.send('invalid user id')
    }
}


module.exports.updateBulkUser = (req, res) => {
    const data = req.body;
    users.forEach(user => {
        data.forEach(d => {
            if (user.id == d.id) {
                if (d.gender) { user.gender = d.gender }
                if (d.address) { user.address = d.address }
                if (d.name) { user.name = d.name }
                if (d.contact) { user.contact = d.contact }
                if (d.photoUrl) { user.photoUrl = d.photoUrl }
            }
        })

    });

    fs.writeFile('user.json', JSON.stringify(users), (err) => {
        if (err) {
            res.send('error occurd')
        }
        res.send('successfully update data')
    })

}


module.exports.deleteUser = (req, res) => {
    const id = req.params.id;
    const data = users.find(user => user.id == id)
    if (data) {
        const rest = users.filter(user => user.id != id)
        fs.writeFile('user.json', JSON.stringify(rest), (err) => {
            if (err) {
                res.send('error occurd')
            }
            res.send('successfully delete data')
        })
    } else {
        res.send('data is not includes in database!!')
    }
}