import { describe, expect, it } from 'vitest';

import { StatBar } from './index';

describe('StatBar', () => {
	it('should render stat label', () => {
		const result = StatBar({ label: 'hp', value: 45 });
		const label = result.props.children[0];
		expect(label.props.children).toBe('hp');
	});

	it('should render stat value', () => {
		const result = StatBar({ label: 'attack', value: 55 });
		const valueText = result.props.children[1];
		expect(valueText.props.children).toBe(55);
	});

	it('should calculate percentage width correctly', () => {
		const result = StatBar({ label: 'speed', value: 127, maxValue: 255 });
		const barBackground = result.props.children[2];
		const barFill = barBackground.props.children;
		const fillStyle = barFill.props.style[1];
		expect(fillStyle.width).toContain('%');
	});

	it('should cap percentage at 100%', () => {
		const result = StatBar({ label: 'hp', value: 300, maxValue: 255 });
		const barBackground = result.props.children[2];
		const barFill = barBackground.props.children;
		const fillStyle = barFill.props.style[1];
		expect(fillStyle.width).toBe('100%');
	});

	it('should use custom color when provided', () => {
		const result = StatBar({ label: 'hp', value: 45, color: '#FF5959' });
		const barBackground = result.props.children[2];
		const barFill = barBackground.props.children;
		const fillStyle = barFill.props.style[1];
		expect(fillStyle.backgroundColor).toBe('#FF5959');
	});

	it('should default maxValue to 255', () => {
		const result = StatBar({ label: 'hp', value: 255 });
		const barBackground = result.props.children[2];
		const barFill = barBackground.props.children;
		const fillStyle = barFill.props.style[1];
		expect(fillStyle.width).toBe('100%');
	});
});
