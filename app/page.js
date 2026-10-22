import { loadContentTypes, loadSite } from "../lib/loadContent";
import Generator from "./Generator";

export default function Home() {
  return <Generator contentTypes={loadContentTypes()} site={loadSite()} />;
}
