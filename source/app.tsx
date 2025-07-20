import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Box, Text, useApp} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import SelectInput from 'ink-select-input';
import {Timer} from './timer.js';
import StopWatch from './stopwatch.js';
import {Pomodoro} from './pomodoro.js';

type Item<T> = {
	label: string;
	value: T;
};

type SideBarProps = {
	navItems: Array<Item<string>>;
	onSelect: (item: Item<string>) => void;
};

function SideBar({navItems, onSelect}: SideBarProps) {
	return (
		<Box
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			alignItems="center"
			justifyContent="center"
			borderStyle="double"
			paddingX={2}
			paddingY={1}
		>
			<SelectInput
				items={navItems}
				onSelect={onSelect}
				itemComponent={({label, isSelected}) => (
					<Text>
						<Gradient name="retro">
							<Text>
								{isSelected ? '❯' : ' '} {label}
							</Text>
						</Gradient>
					</Text>
				)}
			/>
		</Box>
	);
}

const navItems: Item<string>[] = [
	{label: '🏠 Welcome', value: 'welcome'},
	{label: '⏱️ Timer', value: 'timer'},
	{label: '⏰ Stopwatch', value: 'stopwatch'},
	{label: '🍅 Pomodoro', value: 'pomodoro'},
	{label: '🚪 Exit', value: 'exit'},
];

export default function App() {
	const [currentNavItem, setCUrrentNavItem] = useState(navItems[0]);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const {exit} = useApp();

	const onNavItemSlected = (item: Item<string>) => {
		if (item.value === 'exit' && !isTimerActive) {
			exit();
		} else if (!isTimerActive) {
			setCUrrentNavItem(item);
		}
	};

	useEffect(() => {
		console.log('comp mounted');
	}, []);

	return (
		<MainLayout>
			{currentNavItem?.value === 'welcome' && <ContentWelcome />}
			{currentNavItem?.value === 'timer' && (
				<ContentPaneOne onActiveChange={setIsTimerActive} />
			)}
			{currentNavItem?.value === 'stopwatch' && (
				<ContentPaneTwo onActiveChange={setIsTimerActive} />
			)}
			{currentNavItem?.value === 'pomodoro' && (
				<Box
					height={'100%'}
					width={'100%'}
					flexDirection={'column'}
					alignItems="center"
					justifyContent="center"
				>
					<Pomodoro onActiveChange={setIsTimerActive} />
				</Box>
			)}
			{!isTimerActive && (
				<SideBar navItems={navItems} onSelect={onNavItemSlected} />
			)}
		</MainLayout>
	);
}

function MainLayout({children}: PropsWithChildren) {
	return <Box>{children}</Box>;
}

function ContentWelcome() {
	return (
		<Box
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
			paddingTop={3}
		>
			<Gradient name={'retro'}>
				<BigText text={'Poro'} font="tiny" />
			</Gradient>
		</Box>
	);
}

function ContentPaneOne({
	onActiveChange,
}: {
	onActiveChange: (isActive: boolean) => void;
}) {
	return (
		<Box
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			alignItems="center"
			justifyContent="center"
		>
			<Timer onActiveChange={onActiveChange} showStopTime={true} />
		</Box>
	);
}

function ContentPaneTwo({
	onActiveChange,
}: {
	onActiveChange: (isActive: boolean) => void;
}) {
	return (
		<Box
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			alignItems="center"
			justifyContent="center"
		>
			<StopWatch onActiveChange={onActiveChange} />
		</Box>
	);
}
