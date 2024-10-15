import BrandingCard from "@/components/BrandingCard";
import Navbar from "@/components/Navbar";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto my-32 text-center">
        <h1 className="text-4xl">
          Break Language Barriers Instantly – Chat, Translate, and Connect in
          Any Language with Ease.
        </h1>

        <button className="primary-button !text-2xl my-16 !py-3">
          Start Chatting
        </button>

        <div className="flex flex-col md:flex-row">
          <BrandingCard
            heading="Real-Time Translations"
            paragraph="Get instant translations as you chat, ensuring seamless communication 
            in any language. No more delays or misunderstandings—just smooth 
            conversations."
            icon={<AiOutlineThunderbolt size={50} />}
          />

          <BrandingCard
            heading="Customizable Language"
            paragraph="Personalize your chat languages by setting your source and target
              languages. Save your settings for a consistent experience across
              sessions"
            icon={<TfiWorld size={64} />}
          />

          <BrandingCard
            heading="Secure and Private Conversations"
            paragraph="Your data is protected with end-to-end encryption, ensuring that
              your conversations remain private and secure. We prioritize your
              privacy above all else."
            icon={<CiLock size={64} />}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
