import fetch from 'isomorphic-unfetch'
import { orderBy } from 'lodash'

export const getLinks = async () => {
    const data = await fetch(
        'https://api.airtable.com/v0/appelSu1QbwJdEw2p/test?maxRecords=20&view=Grid%20view',
        {
          headers: {
            Authorization: 'Bearer: ' + process.env.AIRTABLE_API_KEY, 
          }
        }
      )
        .then(r => r.json())
        .then(data =>
          data.records.map(({ id, fields }) => ({
            id,
            date: fields['date'],
            url: fields['url'],
            user: fields['user'],
            title: fields['title'],
            description: fields['description'],
            publisher: fields['publisher'],
            img: fields['img'],
            favicon: fields['favicon']
          }))
        )
        .then(events => orderBy(events, 'date', 'desc'))
      return data
}
