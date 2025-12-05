/* eslint-disable react/prop-types */

import Text from "../Heading/text";

function FeatureCard({ img, heading, content,width="w-16",height="h-16" }) {
  return (
    <div className="flex items-start gap-5">
      <img src={img} alt={img} className={`object-cover ${width} ${height} `} />
      <div className="flex flex-col gap-2">
        <Text content={heading} textColor="primary" className="font-semibold sm:text-lg text-sm" />
        <Text content={content} className="sm:text-base text-xs" />
        <p className="bg-primary border border-primary w-1/12 h-1"></p>
      </div>
    </div>
  );
}

export default FeatureCard;
