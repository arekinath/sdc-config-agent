/*
 * Copyright (c) 2013, Joyent, Inc. All rights reserved.
 *
 * lib/endpoints/server/images.js: SAPI endpoints to manage images
 */

var restify = require('restify');

function Images() {}

Images.download = function (req, res, next) {
	var model = this.model;
	var log = model.log;

	model.downloadImage(req.params.uuid, function (err) {
		if (err) {
			log.error(err, 'failed to download image');
			return (next(err));
		}

		res.send(204);
		return (next());

	});

	return (null);
};

Images.search = function (req, res, next) {
	var model = this.model;
	var log = model.log;

	var name = req.params.name;

	if (!name) {
		log.error('missing "name" parameter');
		return (next(new restify.MissingParameterError()));
	}

	model.searchImages(name, function (err, images) {
		if (err)
			return (next(err));

		res.send(images);
		return (next());
	});

	return (null);
};


function attachTo(sapi, model) {
	var toModel = {
		model: model
	};

	// Download an image
	sapi.post({ path: '/images/:uuid', name: 'DownloadImage' },
		Images.download.bind(toModel));

	// Search for images
	sapi.get({ path: '/images', name: 'SearchImages' },
		Images.search.bind(toModel));
}

exports.attachTo = attachTo;