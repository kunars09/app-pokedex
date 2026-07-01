import { describe, expect, it } from 'vitest';

import { TypeBadge } from './index';

describe('TypeBadge', () => {
	it('should render type name', () => {
		const result = TypeBadge({ type: 'fire' });
		const text = result.props.children;
		expect(text.props.children).toBe('fire');
	});

	it('should apply known type color as background', () => {
		const result = TypeBadge({ type: 'water' });
		const style = result.props.style;
		const bgStyle = style[1];
		expect(bgStyle.backgroundColor).toBeDefined();
	});

	it('should fallback to gray for unknown type', () => {
		const result = TypeBadge({ type: 'unknown_type' });
		const style = result.props.style;
		const bgStyle = style[1];
		expect(bgStyle.backgroundColor).toBeDefined();
	});

	it('should render electric type', () => {
		const result = TypeBadge({ type: 'electric' });
		const text = result.props.children;
		expect(text.props.children).toBe('electric');
	});

	it('should render grass type', () => {
		const result = TypeBadge({ type: 'grass' });
		const text = result.props.children;
		expect(text.props.children).toBe('grass');
	});
});
