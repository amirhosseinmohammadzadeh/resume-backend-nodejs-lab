var labDatabase = {
	report: {
		financial: {
			select: null,
			insert: null,
		},
		technecian: {
			select: null,
			insert: null,
			update: null,
		},
	},
	request: {
		product: {
			select: null,
			insert: null,
			delete: null,
			update: null,
		},
		rowMaterial: {
			select: null,
			insert: null,
			delete: null,
			update: null,
		},
		technecianDelete: {
			select: null,
			insert: null,
			delete: null,
			update: null,
		}
	},
	stoke: {
		select: null,
	},
	user: {
		select: require('./dbLayers/usersSelect.js'),
		insert: require('./dbLayers/usersInsert.js'),
		delete: require('./dbLayers/usersDelete.js'),
		update: require('./dbLayers/usersUpdate.js'),
		technecian: {
			select: require('./dbLayers/usersTechnecianSelect.js'),
			insert: require('./dbLayers/usersTechnecianInsert.js'),
			update: require('./dbLayers/usersTechnecianUpdate.js'),
		},
	},
}

module.exports.lab = labDatabase;