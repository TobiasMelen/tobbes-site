import { css, styled } from "goober";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
    pointer-events: none;
  }
  &:hover::before {
    transform: scaleX(100%);
  }
`;

const getHslColor = (angle: number) => `hsl(${angle}, 100%, 50%)`;

const getHalfHslGradient = (angle: number) =>
  `linear-gradient(${angle}deg, ${new Array(20)
    .fill(null)
    .map((_, index) => getHslColor(Math.abs(angle - index * 2.5)))
    .join(",")}`;

export default function Home(props: Props) {
  const textBackground = useRef<HTMLElement>(null);
  useEffect(() => {
    let hslAngle = Math.random() * 360;
    let stopped = false;
    const animateTextBackground = () => {
      const el = textBackground.current!;
      el.style.color = "transparent";
      el.style.background = getHalfHslGradient(hslAngle);
      hslAngle = hslAngle + 0.5;
      !stopped && requestAnimationFrame(animateTextBackground);
    };
    requestAnimationFrame(animateTextBackground);
    return () => {
      stopped = true;
    };
  }, []);
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
          font-size: 28.45vw;
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
          ref={textBackground}
          className={css`
            background-clip: text;
            -webkit-background-clip: text !important;
          `}
        >
          site
        </span>
      </h1>
      <section
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 3vw 0;
        `}
      >
        <div>
          <h2
            className={css`
              margin: 0;
              font-size: 17vw;
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
          overflow: hidden;
        `}
      >
        <div>
          <h2
            className={css`
              /* overflow-y: hidden; */
              margin: 0;
              font-size: 50.8vw;
              margin-left: -0.03em;
              line-height: .87;
              vertical-align: middle;
              overflow: hidden;
              height: .76em;
            `}
          >
            <InverseLink
              href="https://github.com/tobiasmelen"
            >
              Github
            </InverseLink>
          </h2>
        </div>
      </section>
    </article>
  );
}
