import Splash from "../components/splash";
import Cookie from "next-cookies";

export default function Home() {
  return (
    <div>
      <Splash />
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = context.res;
  const req = context.req;
  const { foodsUser } = Cookie(context);
  if (foodsUser) {
    res.writeHead(302, { Location: `/app` });
    res.end();
    return { props: {} };
  } else {
    res.writeHead(302, { Location: `/login` });
    res.end();
    return { props: {} };
  }
}
