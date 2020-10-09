import { Box, Container, Grid, Heading } from 'theme-ui'
import Post from '../components/post'
import { format } from 'date-fns'

export default ({ months }) => {
  return (
    <>
      <Box
        as="header"
        sx={{
          bg: 'sheet',
          color: 'primary',
          pt: [4, 5],
          pb: 3,
          px: 3,
          mb: [3, 4],
          textAlign: 'center'
        }}
      >
        <Heading as="h1" variant="title" sx={{ mb: 3 }}>
          Design Library
        </Heading>
      </Box>
      <Container>
        {Object.keys(months).map(key => (
          <>
            <Heading variant="headline" sx={{ color: 'accent' }}>
              {format(new Date(`${key}-02`), 'MMMM yyyy')}
            </Heading>
            <Grid columns={[null, 2, 2]} gap={[3, 4]} sx={{ mb: [3, 4] }}>
              {months[key].map(post => (
                <Post {...post} key={post.id} />
              ))}
            </Grid>
          </>
        ))}
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  const { getLinks } = require('../lib/data')
  const { groupBy } = require('lodash')
  const data = await getLinks()
  const months = groupBy(data, d => d.date.substring(0, 7))
  return { props: { data, months }, revalidate: 1 }
}
