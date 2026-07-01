import { describe, expect, it } from 'vitest';

import { Loading } from './index';

describe('Loading', () => {
	it('should render with large size by default', () => {
		const result = Loading({});
		const indicator = result.props.children;
		expect(indicator.props.size).toBe('large');
	});

	it('should render with small size when specified', () => {
		const result = Loading({ size: 'small' });
		const indicator = result.props.children;
		expect(indicator.props.size).toBe('small');
	});

	it('should render with custom color', () => {
		const result = Loading({ color: '#FF0000' });
		const indicator = result.props.children;
		expect(indicator.props.color).toBe('#FF0000');
	});
});
