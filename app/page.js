import { loadContentTypes, loadSite } from "../lib/loadContent";
import Generator from "./Generator";

export default async function Home() {
  const contentTypes = await loadContentTypes();
  return <Generator contentTypes={contentTypes} site={loadSite()} />;
}
