import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import {Timer} from './timer.js';

type PomodoroSession = {
	name: string;
	sessionDuration: number;
	breakDuration: number;
	remainingTime: number;
	isBreak: boolean;
};

type PomodoroProps = {
	onActiveChange: (isActive: boolean) => void;
};

export function Pomodoro({onActiveChange}: PomodoroProps) {
	const [inputValue, setInputValue] = useState('');
	const [sessionName, setSessionName] = useState('');
	const [sessionDuration, setSessionDuration] = useState<number | null>(null);
	const [activeSession, setActiveSession] = useState<PomodoroSession | null>(
		null,
	);
	const [callbackList, setCallbackList] = useState<PomodoroSession[]>([]);

	const handleNameChange = (value: string) => {
		setInputValue(value);
	};

	const handleNameSubmit = (value: string) => {
		if (value.trim()) {
			setSessionName(value.trim());
			setInputValue('');
		}
	};

	const startSession = (duration: number) => {
		const breakDuration = duration === 25 ? 5 : 10;
		setSessionDuration(duration);
		setActiveSession({
			name: sessionName,
			sessionDuration: duration,
			breakDuration,
			remainingTime: duration * 60,
			isBreak: false,
		});
		onActiveChange(true);
	};

	useInput(input => {
		if (sessionName && !sessionDuration) {
			if (input === 'i') {
				startSession(25);
			} else if (input === 'j') {
				startSession(50);
			}
		}
	});

	const handlePause = (remainingTime: number) => {
		if (activeSession) {
			setCallbackList([...callbackList, {...activeSession, remainingTime}]);
			setActiveSession(null);
			onActiveChange(false);
		}
	};

	const handleSessionComplete = () => {
		if (activeSession) {
			setActiveSession({
				...activeSession,
				remainingTime: activeSession.breakDuration * 60,
				isBreak: true,
			});
		}
	};

	const handleBreakComplete = () => {
		setActiveSession(null);
		setSessionName('');
		setSessionDuration(null);
		onActiveChange(false);
	};

	const handleSessionResume = (session: PomodoroSession) => {
		setActiveSession(session);
		setCallbackList(callbackList.filter(s => s.name !== session.name));
		onActiveChange(true);
	};

	if (activeSession) {
		return (
			<Box flexDirection="column" alignItems="center">
				<Text>
					{activeSession.name} -{' '}
					{activeSession.isBreak ? 'Break Time' : 'Focus Time'}
				</Text>
				<Timer
					initialSeconds={activeSession.remainingTime}
					onPause={handlePause}
					onComplete={
						activeSession.isBreak ? handleBreakComplete : handleSessionComplete
					}
					onActiveChange={onActiveChange}
					isCountdown={true}
				/>
				{activeSession.isBreak && <Text>Time for a break!</Text>}
			</Box>
		);
	}

	return (
		<Box flexDirection="column" alignItems="center">
			{!sessionName && (
				<Box flexDirection="column" alignItems="center">
					<Text>Enter session name and press Enter:</Text>
					<TextInput
						value={inputValue}
						onChange={handleNameChange}
						onSubmit={handleNameSubmit}
					/>
				</Box>
			)}

			{sessionName && !sessionDuration && (
				<Box flexDirection="column" alignItems="center">
					<Text>Select session duration:</Text>
					<Text>
						Press <Text color="blue">i</Text> for 25 minutes (5 min break)
					</Text>
					<Text>
						Press <Text color="blue">j</Text> for 50 minutes (10 min break)
					</Text>
				</Box>
			)}

			{callbackList.length > 0 && (
				<Box flexDirection="column" marginTop={1}>
					<Text>Callback List:</Text>
					<Box>
						<SelectInput
							items={callbackList.map(session => ({
								label: `${session.name} (${Math.floor(
									session.remainingTime / 60,
								)}:${String(session.remainingTime % 60).padStart(2, '0')})`,
								value: session,
							}))}
							onSelect={item => handleSessionResume(item.value)}
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
}
