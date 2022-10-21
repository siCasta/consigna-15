process.on('message', cant => {
    let number = 0

    for (let i = 0; i < cant; i++) number += i

    process.send(number)
})
