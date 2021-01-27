import { Image, Text, Heading, Box, Container } from 'theme-ui'
import tt from 'tinytime'
import moment from 'moment'
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import Markdown from 'markdown-to-jsx';

function shorten(text) {
	let textSplit = text.split(' ')
	if (textSplit.length > 30) {
		let shortened = textSplit.slice(0, 30)
		return shortened.join(' ') + '...'
	} else {
		return text
	}
} // I might use this later for "...read more" component

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
					{moment(date).format('MMMM Do, YYYY')}
				</Text>
				<Heading as="h1" sx={{ mb: 1 }}>
					{event}
				</Heading>
			</Box>
			<Container>
				{/*<Image src={image} sx={{ mx: 'auto', maxWidth: ['auto', 512], height: 'auto' }} />*/}
				<Text sx={{ p: 3, color: 'black', fontSize: [1, 2] }}>
					<Markdown options={{wrapper: 'Text'}}>{about}</Markdown>
				</Text>
			</Container>
			<style>{`
				img {
				  width: 100%;
				}
				Text {
					fontSize: 24px;
				}
		      `}</style>
		</VerticalTimelineElement>
	)

export default Post
