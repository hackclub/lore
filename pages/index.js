import { Container, Box, Text, Heading } from 'theme-ui'
import fetch from 'isomorphic-unfetch'

export default () => {
  return <Container>
      <Heading as="h1" variant="title">
          Design Library
      </Heading>
      <Text>They're gonna be great</Text>
  </Container>
}

export const getStaticProps = async () => {
	
}