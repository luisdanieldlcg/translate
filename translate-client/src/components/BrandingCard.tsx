interface Props {
  heading: string;
  paragraph: string;
  icon: any;
}
const BrandingCard = ({ heading, paragraph, icon }: Props) => {
  return (
    <>
      <div className="mx-3 border border-border p-5 rounded-xl my-3">
        <div className="mb-4 flex justify-center">{icon}</div>
        <div>
          <h1 className="font-bold text-lg">{heading}</h1>
          <p className="my-4 text-justify text-sm mx-3">{paragraph}</p>
        </div>
      </div>
    </>
  );
};
export default BrandingCard;
