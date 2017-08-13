'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

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
			prompts.push({
				type: 'input',
				name: 'featurePath',
				message: 'Where would you like to keep your features?',
				default: './src/features/'
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

		if (this.props.featurePath) {
			this.config.set('featurePath', this.props.featurePath)
		}

		let name = this.options.featureName;
		let path = this.config.get('featurePath') + name + '/';
		let config = {
			name: name
		};


		if (this.props.isClass) {
			this.fs.copyTpl(
				this.templatePath('classComponent.js'),
				this.destinationPath(path + name + '.js'),
				config
			);
		} else {
			this.fs.copyTpl(
				this.templatePath('component.js'),
				this.destinationPath(path + name + '.js'),
				config
			);
		}

		this.fs.copyTpl(
			this.templatePath('component.scss'),
			this.destinationPath(path + name + '.scss'),
			config
		);

		this.fs.copyTpl(
			this.templatePath('component.test.js'),
			this.destinationPath(path + name + '.test.js'),
			config
		);

		if (this.props.hasStories || this.options.all) {
			this.fs.copyTpl(
				this.templatePath('component.stories.js'),
				this.destinationPath(path + name + '.stories.js'),
				config
			);
		}
	}
};
