import { css, styled } from "goober";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
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

const InverseLink = styled("a")`
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
`;

export default function Home(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <article
      className={css`
        margin: 0 0.6vw;
      `}
    >
      <Head>
        <title>tobbes.site</title>
        <meta name="description" content="The site of tobbe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        className={css`
          font-size: 26vw;
          line-height: 0.7;
          margin: 0;
          /* margin-bottom: 0.1em; */
          white-space: nowrap;
          border-bottom: 0.15em solid;
          margin-top: 0.09em;
        `}
      >
        Tobbes.
        <span
          className={css`
            color: white;
            position: relative;
          `}
        >
          <span
            className={css`
              font-family: Arial, Helvetica, sans-serif;
              position: absolute;
              left: 0;
              top: 0;
              mix-blend-mode: multiply;
              width: 101%;
              height: 24.5vw;
              background: linear-gradient(deeppink, crimson, orange);
            `}
          ></span>
          site
        </span>
      </h1>
      <section
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 7vw;
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
              <Link
                href={`/projects/${encodeURIComponent(project.name)}`}
                passHref
              >
                <InverseLink
                  className={css`
                    display: inline-block;
                    font-size: 3vw;
                    line-height: 0.87;
                  `}
                >
                  {project.name}
                </InverseLink>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section
        className={css`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-bottom: 7vw;
        `}
      >
        <div>
          <InverseLink href="https://github.com/tobiasmelen">
            <h2
              className={css`
                margin: 0;
                font-size: 12.5vw;
                line-height: 0.87;
              `}
            >
              Github
            </h2>
          </InverseLink>
        </div>
      </section>
    </article>
  );
}
