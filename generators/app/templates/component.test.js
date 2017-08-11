import React from 'react';
import <%= name %> from './<%= name %>';
import renderer from 'react-test-renderer';

describe('<<%= name %> />', () => {

	it('should render the default', () => {
		const tree = renderer.create(
			<<%= name %> />
		);
		expect(tree).toMatchSnapshot();
	});
});