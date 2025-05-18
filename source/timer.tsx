import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

interface TimerProps {
	initialSeconds?: number;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds = 0 }) => {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isActive) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds + 1);
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive]);

	const formatTime = () => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		return [
			hours.toString().padStart(2, '0'),
			minutes.toString().padStart(2, '0'),
			secs.toString().padStart(2, '0')
		].join(':');
	};

	const toggle = () => {
		setIsActive(!isActive);
	};

	const reset = () => {
		setSeconds(0);
		setIsActive(false);
	};

	// Handle keyboard input
	useInput((input) => {
		if (input === 'p') {
			toggle();
		}
		if (input === 'r') {
			reset();
		}
	});

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
			</Box>

			<Box marginBottom={1}>
				<Gradient name={'retro'}>
					<BigText font='chrome' text={formatTime() ?? ""} />
				</Gradient>
			</Box>
			<Box>
				<Text >
					Status: <Text color={isActive ? "green" : "yellow"}>{isActive ? "Running" : "Paused"}</Text>
				</Text>
			</Box>
			<Box marginTop={1}>
				<Text>Press <Text bold color="blue">p</Text> to {isActive ? "pause" : "play"}, <Text bold color="red">r</Text> to reset</Text>
			</Box>
		</Box>
	);
};

// Example app wrapper (you can use this to run the timer)
const App = () => {
	return <Timer />;
};

export { Timer };
export default App;
