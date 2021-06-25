import Search from "./../components/search";
import Tray from "./../components/tray";
export default function UserApp({ items }) {
  return (
    <div className="box">
      <Search />
      <Tray items={items} />
      <h3>Testing out sth</h3>
    </div>
  );
}

export async function getServerSideProps() {
  let items;
  try {
    items = await (
      await fetch(
        "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/localfoods-brhgi/service/getFoods/incoming_webhook/webhook0"
      )
    ).json();
  } catch (error) {
    console.log("failed to fetch", error);
  }
  return {
    props: {
      items,
    },
  };
}
