import { Box } from "ink"
import BigText from "ink-big-text"
import Gradient from "ink-gradient"
import React from "react"
function ContentPaneOne() {
	<Box
		borderStyle={'single'}
		height={'100%'}
		width={'100%'}
		flexDirection={'column'}
		paddingLeft={4}
		paddingRight={4}
	>
		<Gradient name={'retro'}>
			<BigText text={'Pane 1'} />
		</Gradient>
		<Text>I'm the first content area</Text>
	</Box>
}



