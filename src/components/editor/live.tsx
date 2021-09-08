import dynamic from "next/dynamic";

const LiveEditor = dynamic(() => import("react-live").then((mod) => mod.LiveEditor), {
  ssr: false,
});

export default LiveEditor;
