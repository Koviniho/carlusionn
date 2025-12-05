
import Images from "../../assets/images";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import ProfileCard from "../ProfileCard";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function MeetTheTeam() {
  const { t } = useTranslation(); // Use i18n to manage language
  const team = t("aboutUs.MeetTheTeam.team", {
    returnObjects: true,
  });
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[800px] sm:h-[400px] md:h-[520px]  flex  pt-20 justify-center text-white"
        style={{
          backgroundImage: `url( ${Images.teamBackground})`,
        }}
      >
  
        <div className="absolute inset-0 bg-black opacity-50"></div>

      
        <div className="relative z-10 text-center px-4 sm:px-8 md:px-12">
          <MainHeading heading={t("aboutUs.MeetTheTeam.heading")} />

        
          <Text
            content={t("aboutUs.MeetTheTeam.content")}
            fontWeight="font-medium"
            textColor="text-white"
            textSize="text-sm sm:text-base md:text-lg lg:text-xl"
          />
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-center -mt-[250px] relative z-40 gap-5 px-4 ">
        {team?.map((member, index) => (
          <ProfileCard
            key={index}
            image={Images[member.img]}
            name={member.name}
            title={member.title}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
}

export default MeetTheTeam;
