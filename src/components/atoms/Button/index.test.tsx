import { describe, expect, it, vi } from 'vitest';

import { Button } from './index';

describe('Button', () => {
	it('should render the title text', () => {
		const result = Button({ title: 'Press me', onPress: vi.fn() });
		const textChild = result.props.children;
		expect(textChild.props.children).toBe('Press me');
	});

	it('should apply styles by default', () => {
		const result = Button({ title: 'Test', onPress: vi.fn() });
		expect(result.props.style).toBeDefined();
	});

	it('should be disabled when disabled prop is true', () => {
		const result = Button({
			title: 'Disabled',
			onPress: vi.fn(),
			disabled: true,
		});
		expect(result.props.disabled).toBe(true);
	});

	it('should pass onPress handler', () => {
		const onPress = vi.fn();
		const result = Button({ title: 'Click', onPress });
		expect(result.props.onPress).toBe(onPress);
	});

	it('should render with outline variant', () => {
		const result = Button({
			title: 'Outline',
			onPress: vi.fn(),
			variant: 'outline',
		});
		expect(result.props.children).toBeDefined();
	});

	it('should render with secondary variant', () => {
		const result = Button({
			title: 'Secondary',
			onPress: vi.fn(),
			variant: 'secondary',
		});
		expect(result.props.children).toBeDefined();
	});
});
