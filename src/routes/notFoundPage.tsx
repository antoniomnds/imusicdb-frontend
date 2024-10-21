import {Link} from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <h2>Ooops!</h2>
      <p>The resource you&#39;re looking for doesn&#39;t exist!</p>
      <Link to={"/"}>Go Back</Link>
    </main>
  );
}
