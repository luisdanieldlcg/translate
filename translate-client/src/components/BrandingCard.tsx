interface Props {
  heading: string;
  paragraph: string;
  icon: any;
}
const BrandingCard = ({ heading, paragraph, icon }: Props) => {
  return (
    <>
      <div className="mx-5 border border-border p-5 rounded-xl my-3">
        <div className="mb-4 flex justify-center">{icon}</div>
        <div>
          <h1 className="font-bold text-xl">{heading}</h1>
          <p className="my-4 text-justify text-sm">{paragraph}</p>
        </div>
      </div>
    </>
  );
};
export default BrandingCard;
