import { describe, expect, it, vi } from 'vitest';

import { Input } from './index';

describe('Input', () => {
	it('should render with value and onChangeText', () => {
		const onChangeText = vi.fn();
		const result = Input({ value: 'hello', onChangeText });
		const textInput = result.props.children[1];
		expect(textInput.props.value).toBe('hello');
		expect(textInput.props.onChangeText).toBe(onChangeText);
	});

	it('should render label when provided', () => {
		const result = Input({ value: '', onChangeText: vi.fn(), label: 'Name' });
		const label = result.props.children[0];
		expect(label.props.children).toBe('Name');
	});

	it('should not render label when not provided', () => {
		const result = Input({ value: '', onChangeText: vi.fn() });
		const label = result.props.children[0];
		expect(label).toBeFalsy();
	});

	it('should render error message when provided', () => {
		const result = Input({
			value: '',
			onChangeText: vi.fn(),
			error: 'Required',
		});
		const error = result.props.children[2];
		expect(error.props.children).toBe('Required');
	});

	it('should not render error when not provided', () => {
		const result = Input({ value: '', onChangeText: vi.fn() });
		const error = result.props.children[2];
		expect(error).toBeFalsy();
	});

	it('should pass placeholder to TextInput', () => {
		const result = Input({
			value: '',
			onChangeText: vi.fn(),
			placeholder: 'Enter text',
		});
		const textInput = result.props.children[1];
		expect(textInput.props.placeholder).toBe('Enter text');
	});

	it('should pass keyboardType to TextInput', () => {
		const result = Input({
			value: '',
			onChangeText: vi.fn(),
			keyboardType: 'email-address',
		});
		const textInput = result.props.children[1];
		expect(textInput.props.keyboardType).toBe('email-address');
	});

	it('should pass secureTextEntry to TextInput', () => {
		const result = Input({
			value: '',
			onChangeText: vi.fn(),
			secureTextEntry: true,
		});
		const textInput = result.props.children[1];
		expect(textInput.props.secureTextEntry).toBe(true);
	});
});
