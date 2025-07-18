import React, {useState, useEffect} from 'react';
import {Box, Text, useInput} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import {GradientTheme, cycleGradient, cyclePreviousGradient} from './colors.js';

interface StopWatchProps {
	onActiveChange?: (isActive: boolean) => void;
	initialTheme?: GradientTheme;
}

const StopWatch: React.FC<StopWatchProps> = ({
	onActiveChange,
	initialTheme = 'rainbow',
}) => {
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [stopTime, setStopTime] = useState(300); // Default 5 minutes
	const [theme, setTheme] = useState<GradientTheme>(initialTheme);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isActive && seconds > 0) {
			interval = setInterval(() => {
				setSeconds(seconds => {
					const newSeconds = seconds - 1;
					if (newSeconds === 0) {
						setIsActive(false);
						onActiveChange?.(false);
					}
					return newSeconds;
				});
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, onActiveChange]);

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
		if (newActive && seconds === 0) {
			setSeconds(stopTime);
		}
		setIsActive(newActive);
		if (onActiveChange) {
			onActiveChange(newActive);
		}
	};

	const reset = () => {
		setSeconds(stopTime);
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
			const newTime = key.leftArrow
				? Math.max(60, stopTime - step)
				: stopTime + step;
			setStopTime(newTime);
			setSeconds(newTime);
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
				<Text>Set Time: {Math.floor(stopTime / 60)} minutes (← →)</Text>
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
					to {isActive ? 'pause' : 'start'},{' '}
					<Text bold color="red">
						r
					</Text>{' '}
					to reset
				</Text>
			</Box>
		</Box>
	);
};

export default StopWatch;
