var bell = require('bell');

exports.register = function (server, options, next) {

	server.register(bell, function(err){
		server.auth.strategy('google', 'bell', {
	        provider: 'google',
	        password: 'password',
	        // isSecure: false,
	        // You'll need to go to https://console.developers.google.com and set up an application to get started
	        // Once you create your app, fill out "APIs & auth >> Consent screen" and make sure to set the email field
	        // Next, go to "APIs & auth >> Credentials and Create new Client ID
	        // Select "web application" and set "AUTHORIZED JAVASCRIPT ORIGINS" and "AUTHORIZED REDIRECT URIS"
	        // This will net you the clientId and the clientSecret needed.
	        // Also be sure to pass the redirect_uri as well. It must be in the list of "AUTHORIZED REDIRECT URIS"
	        clientId: '898055496476-pgg0joim1iprka2mht6sd1jhme4ock3f.apps.googleusercontent.com',
	        clientSecret: 'kxAc6l5LiAo9xYqyQZ7gzPbk',
	        providerParams: {
	            redirect_uri: server.info.uri + '/login'
	        }
	    });

		server.route({
	        method: '*',
	        path: '/login',
	        config: {
	            auth: 'google',
	            handler: function (request, reply) {
	                reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
	            }
	        }
	    });
	});

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};