import { trpc } from "../utils/trpc";

export function PingPong() {
  const { data } = trpc.ping.useQuery();
  return (
    <div className="flex justify-center pt-2">
      <button
        onClick={() => {
          alert(data);
        }}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
        Ping
      </button>
    </div>
  );
}
