import fetch from 'isomorphic-unfetch'
import { orderBy } from 'lodash'

export const getLinks = async () => {
    const data = await fetch(
        'https://api.airtable.com/v0/appHH2LvZ06dAvBXE/test?maxRecords=4&view=Grid%20view',
        {
          headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`, 
          }
        }
      )
        .then(r => r.json())
        .then(data =>
          data.records.map(({ id, fields }) => ({
            id,
            date: fields['date'],
            event: fields['event'],
						about: fields['about'],
						tags: fields['tags'], 
						image: fields['image'],
          }))
        )
        .then(events => orderBy(events, 'date', 'desc'))
      return data
}
