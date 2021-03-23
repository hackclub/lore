import Head from 'next/head'

export default function HeadObject() {
    const title = "Lore | Hack Club";
    const description = "A timeline of Hack Club's history!";
    const keywords = "Hack Club, Lore, Timeline, Events";
    const author = "Hack Club";
    const twitter = "@hackclub";
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta property="og:url" content="https://lore.hackclub.dev" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={twitter} />
            <meta name="twitter:creator" content={twitter} />
        </Head>
    )
}