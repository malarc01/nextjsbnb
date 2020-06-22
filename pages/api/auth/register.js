import { User } from '../../../models/user';

export default async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).end(); // Method Not Allowed
		return;
	}

	const { email, password, passwordconfirmation } = req.body;

	if (password !== passwordconfirmation) {
		res.end(JSON.stringify({ status: 'error', message: 'Passwords do not match' }));
		return;
	}

	try {
		console.log('email&password=>', email, password);
		console.log('about to try to create user with email + pass');
		const user = await User.create({ email, password });
		res.end(JSON.stringify({ status: 'success', message: 'User added' }));
		console.log(`SUCCESS =>User.create${email}${password} `);
	} catch (error) {
		res.statusCode = 500;
		let message = 'Something blew up ';
		if (error.name === 'SequelizeUniqueConstraintError') {
			message = 'User already exists';
		}
		console.log('error=>', error);
		res.end(JSON.stringify({ status: 'error', message }));
	}
};
