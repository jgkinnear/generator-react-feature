'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
module.exports = class extends Generator {

	getTemplate(path) {
		if (this.fs.exists(this.destinationPath('.react-feature/' + path))) {
			return this.destinationPath('.react-feature/' + path);
		} else {
			return this.templatePath(path);
		}
	}

	constructor(args, opts) {
		super(args, opts);

		this.argument('featureName', { type: String, required: true });

		// This method adds support for a `--coffee` flag
		this.option('all');
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the superb ' + chalk.red('generator-react-feature') + ' generator!'
		));

		const prompts = [];

		let path = this.config.get('featurePath');

		if (!path) {
			// prompts.push({
			// 	type: 'input',
			// 	name: 'featurePath',
			// 	message: 'Where would you like to keep your features?',
			// 	default: './src/features/'
			// })
			throw new Error('No paths set in your .yo-rc.json');
		} else {
			prompts.push({
				type: 'list',
				name: 'featurePath',
				message: 'Where would you like to keep your features?',
				choices: path
			})
		}

		if (!this.options.all) {
			prompts.push({
				type: 'confirm',
				name: 'isClass',
				message: 'Will your component have state?',
				default: false,
			});
			prompts.push({
				type: 'confirm',
				name: 'hasStories',
				message: 'Do you want to generate a story?',
				default: true,
			});
		}

		return this.prompt(prompts).then((props) => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {

		if (!this.config.get('featurePath') && this.props.featurePath) {
			this.config.set('featurePath', [this.props.featurePath])
		}

		let name = this.options.featureName;
		let path = this.props.featurePath + name + '/';
		let config = {
			name: name
		};


		if (this.props.isClass) {
			this.fs.copyTpl(
				this.getTemplate('classComponent.js'),
				this.destinationPath(path + name + '.js'),
				config
			);
		} else {
			this.fs.copyTpl(
				this.getTemplate('component.js'),
				this.destinationPath(path + name + '.js'),
				config
			);
		}

		this.fs.copyTpl(
			this.getTemplate('component.scss'),
			this.destinationPath(path + name + '.scss'),
			config
		);

		this.fs.copyTpl(
			this.getTemplate('component.test.js'),
			this.destinationPath(path + name + '.test.js'),
			config
		);

		if (this.props.hasStories || this.options.all) {
			this.fs.copyTpl(
				this.getTemplate('component.stories.js'),
				this.destinationPath(path + name + '.stories.js'),
				config
			);
		}
	}
};
