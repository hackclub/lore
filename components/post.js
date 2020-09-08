import { Link, Avatar, Card, Image, Text, Heading } from 'theme-ui'
import tt from 'tinytime'

function shorten(text) {
  let textSplit = text.split(' ')
  if (textSplit.length > 25) {
    let shortened = textSplit.slice(0, 25)
    return shortened.join(' ') + '...'
  } else {
    return text
  }
}

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
  <Card variant="interactive">
    <Link href={url} sx={{ textDecoration: 'none', color: 'text' }}>
      <Text variant="caption">
        Posted at{' '}
        {tt('{MM} {DD}, {YYYY} at {h}:{mm} {a}').render(new Date(date))}
      </Text>
      <Heading variant="subheadline" sx={{ mb: 1 }}>
        {title}
      </Heading>
      <Text as="span" sx={{ display: 'flex', alignItems: 'center', mt: 0, mb: 2}}>
        <Avatar
          src={favicon}
          alt={`logo`}
          size={18}
          sx={{ mx: 2, bg: 'snow' }}
        />{' '}
        {publisher}
      </Text>
      <Image src={img} sx={{ width: 'auto' }} />
      <Text>{shorten(description)}</Text>
    </Link>
  </Card>
)

export default Post
