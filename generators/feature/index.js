'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the superb ' + chalk.red('generator-react-feature') + ' generator!'
		));

		this.log(yosay(
			this.config.get('featurePath')
		))

		const prompts = [{
			type: 'input',
			name: 'componentName',
			message: 'What is the name of your React component'
		},{
			type: 'confirm',
			name: 'isClass',
			message: 'Will your component have state?',
			default: false,
		},{
			type: 'confirm',
			name: 'hasStories',
			message: 'Do you want to generate a story?',
			default: true,
		}];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {

		let name = this.props.componentName;
		let path = this.config.get('featurePath');
		let config = {
			name: name
		};

		this.fs.copyTpl(
			this.templatePath('component.js'),
			this.destinationPath(path + name + '.js'),
			config
		);

		this.fs.copyTpl(
			this.templatePath('component.test.js'),
			this.destinationPath(path + name + 'test.js'),
			config
		);

		if (this.props.hasStories) {
			this.fs.copyTpl(
				this.templatePath('component.stories.js'),
				this.destinationPath(path + name + '.stories.js'),
				config
			);
		}
	}
};
