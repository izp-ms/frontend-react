import { Postcard } from "../../../../models/postcard";

interface Props {
  postcard: Postcard;
}

export const PostcardBack = (props: Props) => {
  const { postcard } = props;
  return <div>PostcardBack {postcard.title}</div>;
};
