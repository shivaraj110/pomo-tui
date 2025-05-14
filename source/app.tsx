import React, { PropsWithChildren, useState } from 'react';
import { Box, useApp } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import SelectInput from 'ink-select-input';
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
			borderStyle={'single'}
			height={'100%'}
			width={25}
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

	return (
		<MainLayout>
			<SideBar navItems={navItems} onSelect={onNavItemSlected} />
			{currentNavItem?.value === 'timer' && <ContentPaneOne />}
			{currentNavItem?.value === 'stopwatch' && <ContentPaneTwo />}
		</MainLayout>
	);
} function MainLayout({ children }: PropsWithChildren) {
	return <Box>{children}</Box>;
}




function ContentPaneOne() {
	return (
		<Box
			borderStyle={'single'}
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
		>
			<Gradient name={'retro'}>
				<BigText text={'Timer'} />
			</Gradient>
		</Box>
	)
}

function ContentPaneTwo() {
	return (
		<Box
			borderStyle={'single'}
			height={'200%'}
			width={'200%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
		>
			<Gradient name={'rainbow'}>
				<BigText text={'Stopwatch'} />
			</Gradient>
		</Box>
	)
}




