import fetch from 'isomorphic-unfetch'
import { orderBy } from 'lodash'

export const getLinks = async () => {
    const other = await fetch(
        'https://api.airtable.com/v0/appHH2LvZ06dAvBXE/actual?view=Grid%20view',
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
						// image: fields['image'],
          }))
				)
		const events = await fetch(
			'https://events.hackclub.com/api/events/all'
		).then(r => r.json())
		.then(data => {
			for (let e of data) {
				other.push({
					id: e.id,
					date: e.start,
					event: e.title,
					about: e.desc,
					tags: e.ama ? ['events', 'amas'] : ['events']
				})
			}
		})
      return other
}
