import { GetServerSideProps } from "next";
import { callVercelApi } from "../../utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { name } = context.params ?? {};
  if (!name || typeof name !== "string") {
    return { notFound: true };
  }
  const domain = (await callVercelApi(`v9/projects/${name}/domains`))
    .domains?.[0]?.name;
  return domain
    ? {
        redirect: { statusCode: 302, destination: `https://${domain}` },
      }
    : { notFound: true };
};

export default function ProjectRedirect() {
  return null;
}
