import { Box, Container, Grid, Heading } from 'theme-ui'
import Post from '../components/post'
import { format } from 'date-fns'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import HeadObject from '../components/head'

export default ({ months }) => {
  return (
    <>
    <HeadObject/>
      <Box
        as="header"
        sx={{
          color: 'primary',
          pt: [4, 5],
          pb: 3,
          px: 3,
          mb: [3, 4],
          textAlign: 'center'
        }}
      >
        <Heading as="h1" variant="title" sx={{ mb: 3 }}>
          The History of Hack Club
        </Heading>
      </Box>
      <Container sx={{bg: 'sunken', width: ['100%', 'wide']}}>
			<VerticalTimeline
			>
				{Object.keys(months).map(key => (
          <>
              {months[key].map(post => (
                <Post {...post} key={post.id} />
              ))}
          </>
        ))}
			</VerticalTimeline>
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  const { getLinks } = require('../lib/data')
  const { groupBy, orderBy } = require('lodash')
  const data = orderBy(await getLinks(), 'date', 'desc')
  const months = groupBy(data, d => d.date.substring(0, 7))
	console.log(months);
  return { props: { data, months }, revalidate: 1 }
}
