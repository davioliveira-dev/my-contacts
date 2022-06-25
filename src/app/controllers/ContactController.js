const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
	async index(req, res) {
		const {orderBy} = req.query;
		const contacts = await ContactsRepository.findAll(orderBy);

		return res.json(contacts);
	}

	async show(req, res) {
		const {id} = req.params;

		if (!id) {
			return res.status(400).json({
				message: 'Missing id',
			});
		}

		const contact = await ContactsRepository.findById(id);

		if (!contact) {
			return res.status(404).json({
				message: 'Contact not found',
			});
		}

		return res.json(contact);
	}

	async store(req, res) {
		const {name, email, phone, category_id} = req.body;

		if (!name) {
			return res.status(400).json({
				message: 'Missing name on body',
			});
		}

		const contactExists = await ContactsRepository.findByEmail(email);

		if (contactExists) {
			return res.status(400).json({
				message: 'This email is already registered',
			});
		}

		const contact = await ContactsRepository.create({
			name,
			email,
			phone,
			category_id,
		});

		return res.json(contact);
	}

	async update(req, res) {
		const {id} = req.params;
		const {name, email, phone, category_id} = req.body;

		if (!id) {
			return res.status(400).json({
				message: 'Missing id',
			});
		}

		const contactExists = await ContactsRepository.findById(id);

		if (!contactExists) {
			return res.status(404).json({
				message: 'Contact not found',
			});
		}

		if (!name) {
			return res.status(400).json({
				message: 'Missing name on body',
			});
		}

		const contactByEmail = await ContactsRepository.findByEmail(email);

		if (contactByEmail && contactByEmail.id !== id) {
			return res.status(400).json({
				message: 'This email is already registered',
			});
		}

		const contact = await ContactsRepository.update(id, {
			name,
			email,
			phone,
			category_id,
		});

		return res.json(contact);
	}

	async delete(req, res) {
		const {id} = req.params;

		if (!id) {
			return res.status(400).json({
				message: 'Missing id',
			});
		}

		await ContactsRepository.delete(id);

		return res.sendStatus(204);
	}
}

module.exports = new ContactController();
