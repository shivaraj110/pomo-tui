import React, {useState, useEffect} from 'react';
import {Box, Text, useInput} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import {GradientTheme, cycleGradient, cyclePreviousGradient} from './colors.js';

interface TimerProps {
	initialSeconds?: number;
	onActiveChange?: (isActive: boolean) => void;
	stopTime?: number;
	initialTheme?: GradientTheme;
}

const Timer: React.FC<TimerProps> = ({
	initialSeconds = 0,
	onActiveChange,
	stopTime: initialStopTime,
	initialTheme = 'mind',
}) => {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [isActive, setIsActive] = useState(false);
	const [stopTime, setStopTime] = useState(initialStopTime);
	const [theme, setTheme] = useState<GradientTheme>(initialTheme);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isActive) {
			interval = setInterval(() => {
				setSeconds(seconds => {
					if (stopTime && seconds >= stopTime) {
						setIsActive(false);
						onActiveChange?.(false);
						return seconds;
					}
					return seconds + 1;
				});
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, stopTime, onActiveChange]);

	const formatTime = () => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		return [
			hours.toString().padStart(2, '0'),
			minutes.toString().padStart(2, '0'),
			secs.toString().padStart(2, '0'),
		].join(':');
	};

	const toggle = () => {
		const newActive = !isActive;
		setIsActive(newActive);
		onActiveChange?.(newActive);
	};

	const reset = () => {
		setSeconds(0);
		setIsActive(false);
		onActiveChange?.(false);
	};

	useInput((input, key) => {
		if (input === 'p') {
			toggle();
		}
		if (input === 'r') {
			reset();
		}
		if (!isActive && (key.leftArrow || key.rightArrow)) {
			const step = 60; // Change by 1 minute
			const currentValue = stopTime || 0;
			const newValue = key.leftArrow
				? Math.max(0, currentValue - step)
				: currentValue + step;
			setStopTime(newValue);
		}
		if (input === '[' || input === ']') {
			setTheme(
				input === '[' ? cyclePreviousGradient(theme) : cycleGradient(theme),
			);
		}
	});

	return (
		<Box
			flexDirection="column"
			padding={1}
			alignItems="center"
			justifyContent="center"
		>
			<Box marginBottom={1} alignItems="center">
				<Text>Stop Time: {Math.floor((stopTime || 0) / 60)} minutes (← →)</Text>
			</Box>

			<Box marginBottom={1} alignItems="center">
				<Text>Theme: {theme} ([ ])</Text>
			</Box>

			<Box marginBottom={1} alignItems="center">
				<Gradient name={theme}>
					<BigText font="chrome" text={formatTime()} />
				</Gradient>
			</Box>
			<Box alignItems="center">
				<Text>
					Status:{' '}
					<Text color={isActive ? 'green' : 'yellow'}>
						{isActive ? 'Running' : 'Paused'}
					</Text>
				</Text>
			</Box>
			<Box marginTop={1} alignItems="center">
				<Text>
					Press{' '}
					<Text bold color="blue">
						p
					</Text>{' '}
					to {isActive ? 'pause' : 'play'},{' '}
					<Text bold color="red">
						r
					</Text>{' '}
					to reset
				</Text>
			</Box>
		</Box>
	);
};

// Example app wrapper (you can use this to run the timer)
const App = () => {
	return <Timer />;
};

export {Timer};
export default App;
