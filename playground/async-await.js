// const doWork = async () => {
// 	// throw new Error('Suatu error terjadi')
// 	return 'Andri'
// }

// doWork().then((result) => {
// 	console.log(result) //Hasilnya Andri
// }).catch((error) => {
// 	console.log(error)
// })

const add = (a,b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (a < 0 || b < 0){
				return reject('Numbers must be non-negative')
			}
			resolve(a+b)
		},2000)
	})
}

const doWork = async () => {
	const sum = await add(1,99)
	const sum2 = await add(sum, 50)
	const sum3 = await add(sum2, 3)
	return sum3
}

doWork().then((result) => {
	console.log('result', result) //Hasilnya Andri
}).catch((error) => {
	console.log(error)
})

//Async await urusannya sama promise
//Async ditaro sebelum function declaration
//Async function always return Promise