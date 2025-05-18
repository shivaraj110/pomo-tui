import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Box, useApp } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import SelectInput from 'ink-select-input';
import { Timer } from './timer.js';
type Item<T> = {
	label: string;
	value: T;
};
type SideBarProps = {
	navItems: Array<Item<string>>;
	onSelect: (item: Item<string>) => void;
};


function SideBar({ navItems, onSelect }: SideBarProps) {
	return (
		<Box
			height={'100%'}
			width={20}
			paddingTop={1}
			paddingBottom={1}
			paddingLeft={2}
			paddingRight={2}
		>
			<SelectInput items={navItems} onSelect={onSelect} />
		</Box>
	);
}


const navItems: Item<string>[] = [
	{ label: 'welcome', value: 'welcome' },
	{ label: 'timer', value: 'timer' },
	{ label: 'stopwatch', value: 'stopwatch' },
	{ label: 'Exit', value: 'exit' },
]


export default function App() {
	const [currentNavItem, setCUrrentNavItem] = useState(navItems[0]);
	const { exit } = useApp();

	const onNavItemSlected = (item: Item<string>) => {
		if (item.value === 'exit') {
			exit();
		} else {
			setCUrrentNavItem(item);
		}
	};

	useEffect(() => {
		console.log('comp mounted');

	}, []);
	return (
		<MainLayout>
			{currentNavItem?.value === 'welcome' && <ContentWelcome />}
			{currentNavItem?.value === 'timer' && <ContentPaneOne />}
			{currentNavItem?.value === 'stopwatch' && <ContentPaneTwo />}
			<SideBar navItems={navItems} onSelect={onNavItemSlected} />

		</MainLayout>
	);
} function MainLayout({ children }: PropsWithChildren) {
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
				<BigText text={'Pomodororo'} font='tiny' />
			</Gradient>
		</Box>
	)
}


function ContentPaneOne() {
	return (
		<Box
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={2}
			paddingRight={2}
			paddingTop={2}

		>
			<Gradient name={'retro'}>
				<BigText text={'Timer'} font='tiny' />
			</Gradient>
			<Timer />
		</Box>
	)
}

function ContentPaneTwo() {
	return (
		<Box
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
			paddingTop={3}

		>
			<Gradient name={'rainbow'}>
				<BigText text={'Stopwatch'} font='tiny' />
			</Gradient>
		</Box>
	)
}




