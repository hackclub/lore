import {
  Link,
  Box,
  Avatar,
  Container,
  Grid,
  Card,
  Image,
  Text,
  Heading
} from 'theme-ui'
import tt from 'tinytime'

const Post = ({
  id,
  date,
  url,
  user,
  title,
  description,
  publisher,
  img,
  favicon
}) => (
  <Link href={url}>
    <Card>
      <Text variant="caption">
        Posted by {user} on {tt('{MM} {DD}, {YYYY} at {h}:{mm} {a}').render(new Date(date))}
      </Text>
      <Heading variant="headline" sx={{ mt: 0 }}>
        {title}
      </Heading>
      <Image src={img} />
      <Text>
        <Avatar src={favicon} alt={publisher + ' profile picture'} size={32} sx={{ mx: 2, bg: 'snow' }}/>{' '}
        {publisher}
      </Text>
      <Text>{description}</Text>
    </Card>
  </Link>
)

export default ({ data = [] }) => {
  return (
    <>
      <Box
        as="header"
        sx={{
          bg: 'background',
          color: 'primary',
          pt: [4, 5],
          pb: 3,
          px: 3,
          mb: [3, 4]
        }}
      >
        <Container>
          <Heading as="h1" variant="title" sx={{mb: 3, textAlign: 'center'}}>
            Design Library
          </Heading>
          <Grid columns={[null, 2, 4]} gap={[3, 4]}>
            {data.map(post => (
              <Post {...post} key={post.id} />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export const getStaticProps = async () => {
  const { getLinks } = require('../lib/data')
  const data = await getLinks()
  return { props: { data } }
}
