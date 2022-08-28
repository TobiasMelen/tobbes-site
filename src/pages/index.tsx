import { css } from "goober";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { callVercelApi } from "../utils";

type Props = {
  vercelProjects: { name: string }[];
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=500, stale-while-revalidate=1000"
  );
  const { projects } = await callVercelApi("v9/projects");
  return {
    props: {
      vercelProjects: projects.map((p: any) => ({ name: p.name })),
    },
  };
};

export default function Home(props: Props) {
  return (
    <article
      className={css`
        margin: 0 0.6vw;
        max-width: 86.5vw;
        /* Du kan vara mobile first */
        @media (max-width: 500px) {
          margin: 0.5em 1em;
          max-width: 100%;
        }
      `}
    >
      <Head>
        <title>Tobbes site</title>
        <meta name="description" content="The site of tobbe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        className={css`
          font-size: 23vw;
          line-height: 0.87;
          margin: 0;
          margin-bottom: 0.1em;
          text-decoration: underline;
        `}
      >
        Tobbes site
      </h1>
      <section
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div>
          <h2
            className={css`
              margin: 0;
              font-size: 12.5vw;
              line-height: 0.71;
            `}
          >
            Vercel things
          </h2>
          <small
            className={css`
              font-size: max(1.25vw, 0.7em);
              text-align: right;
              display: block;
            `}
          >
            (These are auto-listed from api, so probably they&apos;re crap)
          </small>
        </div>
        <ul
          className={css`
            list-style: none;
            padding: 0;
            text-align: right;
          `}
        >
          {props.vercelProjects.map((project) => (
            <li key={project.name}>
              <Link href={`/projects/${encodeURIComponent(project.name)}`}>
                <a
                  className={css`
                    display: inline-block;
                    font-size: 3vw;
                    line-height: 0.87;
                    position: relative;
                    &::before {
                      content: " ";
                      backdrop-filter: invert(100%);
                      position: absolute;
                      width: 100%;
                      height: 98%;
                      top: -5%;
                      transform: scaleX(0%);
                    }
                    &:hover::before {
                      transform: scaleX(100%);
                    }
                    @media (max-width: 500px) {
                      font-size: 4vw;
                      padding: 0.3em 0;
                    }
                  `}
                >
                  {project.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
