import { loadContentTypes } from "../lib/loadContent";
import Generator from "./Generator";

export default function Home() {
  const contentTypes = loadContentTypes();
  return <Generator contentTypes={contentTypes} />;
}
