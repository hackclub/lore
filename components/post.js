import { Image, Text, Heading, Box, Container } from 'theme-ui'
import tt from 'tinytime'
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

function shorten(text) {
	let textSplit = text.split(' ')
	if (textSplit.length > 30) {
		let shortened = textSplit.slice(0, 30)
		return shortened.join(' ') + '...'
	} else {
		return text
	}
}

const Post = ({
	id,
	date,
	event,
	about,
	tags,
	image
}) => (
		<VerticalTimelineElement
			contentStyle={{ padding: '0', borderRadius: '8px', boxShadow: '8px' }}
			iconStyle={{ background: '#ec3750', color: '#ec3750' }}>
			<Box sx={{ bg: 'primary', color: 'white', mb: 2, p: 3, borderRadius: "8px 8px 0 0" }}>
				<Text variant="subheadline">
					{tt('{MM} {DD}, {YYYY}').render(new Date(date))}
				</Text>
				<Heading as="h1" sx={{ mb: 1 }}>
					{event}
				</Heading>
			</Box>
			<Container>
				<Text as="span" sx={{ display: 'flex', alignItems: 'center', mt: 0, mb: 2 }}>

				</Text>
				{/*<Image src={image} sx={{ mx: 'auto', maxWidth: ['auto', 512], height: 'auto' }} />*/}
				<Text sx={{ p: 3, color: 'black', fontSize: [1, 2] }}>{about}</Text>
			</Container>
		</VerticalTimelineElement>
	)

export default Post
